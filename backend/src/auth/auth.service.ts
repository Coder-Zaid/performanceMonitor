import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    // Create organization and user in a transaction
    return this.prisma.$transaction(async (tx) => {
      // 1. Create Organization
      const organization = await tx.organization.create({
        data: {
          name: dto.organizationName,
          slug: dto.organizationName.toLowerCase().replace(/ /g, '-'),
        },
      });

      // 2. Create default Role (founder)
      const role = await tx.role.create({
        data: {
          orgId: organization.id,
          name: 'founder',
          permissions: ['*'], // Full access for founder
          isSystem: true,
        },
      });

      // 3. Create User
      const user = await tx.user.create({
        data: {
          email: dto.email,
          passwordHash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          orgId: organization.id,
          roleId: role.id,
          joiningDate: new Date(),
        },
      });

      return this.generateToken(user);
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private async generateToken(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      orgId: user.orgId,
      role: user.role?.name || 'employee'
    };
    
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role?.name,
        orgId: user.orgId,
      },
    };
  }
}
