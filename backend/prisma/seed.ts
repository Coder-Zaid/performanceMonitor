import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 12);

  // 1. Create Organization
  const org = await prisma.organization.create({
    data: {
      name: 'Prelude Corp',
      slug: 'prelude-corp',
    },
  });

  // 2. Create Roles
  const founderRole = await prisma.role.create({
    data: {
      orgId: org.id,
      name: 'founder',
      permissions: ['*'],
      isSystem: true,
    },
  });

  const managerRole = await prisma.role.create({
    data: {
      orgId: org.id,
      name: 'manager',
      permissions: ['read', 'write', 'review'],
      isSystem: true,
    },
  });

  const employeeRole = await prisma.role.create({
    data: {
      orgId: org.id,
      name: 'employee',
      permissions: ['read', 'submit'],
      isSystem: true,
    },
  });

  // 3. Create Users
  const founder = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Founder',
      email: 'founder@prelude.com',
      passwordHash,
      orgId: org.id,
      roleId: founderRole.id,
      joiningDate: new Date(),
    },
  });

  const manager = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Manager',
      email: 'manager@prelude.com',
      passwordHash,
      orgId: org.id,
      roleId: managerRole.id,
      joiningDate: new Date(),
    },
  });

  const employee = await prisma.user.create({
    data: {
      firstName: 'Alice',
      lastName: 'Employee',
      email: 'employee@prelude.com',
      passwordHash,
      orgId: org.id,
      roleId: employeeRole.id,
      joiningDate: new Date(),
      managerId: manager.id,
    },
  });

  // 4. Create Departments & Teams
  const dept = await prisma.department.create({
    data: {
      orgId: org.id,
      name: 'Sales',
      headId: manager.id,
    },
  });

  const team = await prisma.team.create({
    data: {
      orgId: org.id,
      name: 'Alpha Team',
      departmentId: dept.id,
      leadId: manager.id,
    },
  });

  await prisma.userTeam.create({
    data: {
      userId: employee.id,
      teamId: team.id,
    },
  });

  // 5. Create KPIs
  const kpi1 = await prisma.kpi.create({
    data: {
      orgId: org.id,
      name: 'Daily Calls',
      metricType: 'number',
      unit: 'calls',
      targetValue: 50,
    },
  });

  const kpi2 = await prisma.kpi.create({
    data: {
      orgId: org.id,
      name: 'Revenue Generated',
      metricType: 'currency',
      unit: 'USD',
      targetValue: 1000,
    },
  });

  console.log('Seed data created successfully!');
  console.log('Login credentials:');
  console.log('Founder: founder@prelude.com / password123');
  console.log('Manager: manager@prelude.com / password123');
  console.log('Employee: employee@prelude.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
