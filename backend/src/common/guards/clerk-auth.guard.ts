import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createClerkClient, verifyToken } from '@clerk/backend';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private clerkClient: ReturnType<typeof createClerkClient>;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.clerkClient = createClerkClient({
      secretKey: this.configService.get<string>('CLERK_SECRET_KEY'),
      publishableKey: this.configService.get<string>('CLERK_PUBLISHABLE_KEY'),
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    require('fs').appendFileSync('auth-debug.log', new Date().toISOString() + ': AuthHeader=' + authHeader + '\n');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No authorization token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      // verifyToken validates the JWT and returns the Clerk session payload.
      // publicMetadata is exposed as `public_metadata` (snake_case) on the decoded token.
      const decoded = await verifyToken(token, {
        secretKey: this.configService.get<string>('CLERK_SECRET_KEY'),
      });

      // Extract role from publicMetadata
      const publicMetadata = (decoded as any).publicMetadata || (decoded as any).public_metadata || {};
      let role = publicMetadata.role || 'employee';

      // Check for dev_role override cookie
      const cookieHeader = request.headers.cookie || '';
      const match = cookieHeader.match(/dev_role=([^;]+)/);
      if (match && ['founder', 'manager', 'employee', 'super_admin'].includes(match[1])) {
        role = match[1];
      }

      // To ensure the dashboard works seamlessly, we'll try to map the Clerk user to a seeded DB user
      let dbUser: any = null;

      try {
        // If we have a devRole override, we specifically look up the database user with that role first!
        if (match && ['founder', 'manager', 'employee', 'super_admin'].includes(match[1])) {
          dbUser = await this.prisma.user.findFirst({
            where: { role: { name: match[1] } },
            include: { role: true }
          });
        }

        // Otherwise, standard mapping via Clerk user email
        if (!dbUser) {
          const clerkUser = await this.clerkClient.users.getUser(decoded.sub);
          const email = clerkUser.emailAddresses[0]?.emailAddress;

          if (email) {
            dbUser = await this.prisma.user.findUnique({ 
              where: { email },
              include: { role: true }
            });
          }
        }
      } catch (e) {
        console.warn('Could not fetch clerk user details for mapping:', e.message);
      }

      // If no matching email is found, map to the first seeded user of the matching role
      if (!dbUser) {
        dbUser = await this.prisma.user.findFirst({
          where: { role: { name: role } },
          include: { role: true },
        });

        // Ultimate fallback
        if (!dbUser) {
          dbUser = await this.prisma.user.findFirst({
            include: { role: true }
          });
        }
      }

      // Determine the final role to use for authorization (prefer dbUser's actual role)
      const finalRole = dbUser?.role?.name || role;

      request.user = {
        id: dbUser ? dbUser.id : decoded.sub,
        clerkId: decoded.sub,
        role: finalRole,
        orgId: dbUser ? dbUser.orgId : (publicMetadata.orgId || null),
      };

      return true;
    } catch (error) {
      require('fs').appendFileSync('clerk-error.log', new Date().toISOString() + ': ' + (error?.message || error) + '\n');
      console.error('Clerk token verification failed:', error?.message || error);
      throw new UnauthorizedException('Invalid or expired session token');
    }
  }
}
