import { PrismaClient, Role, PlanType, Gender } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // 1. Create Super Admin
  const superAdminPassword = await bcrypt.hash('superadmin123', 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@saasgym.com' },
    update: {},
    create: {
      email: 'superadmin@saasgym.com',
      passwordHash: superAdminPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: Role.SUPER_ADMIN,
    },
  });
  console.log('Created Super Admin:', superAdmin.email);

  // 2. Create SaaS Plans
  const basicPlan = await prisma.saasPlan.create({
    data: {
      name: 'Basic Gym Tier',
      price: 49.99,
      maxMembers: 100,
      features: ['Member Management', 'Basic Reports'],
    }
  });

  // 3. Create a Demo Gym
  const demoGym = await prisma.gym.create({
    data: {
      name: 'Titan Fitness',
      subdomain: 'titan',
      address: '123 Muscle Street',
      contactEmail: 'contact@titanfitness.com',
      subscription: {
        create: {
          saasPlanId: basicPlan.id,
          status: 'ACTIVE'
        }
      }
    }
  });
  console.log('Created Demo Gym:', demoGym.name);

  // 4. Create Gym Owner
  const ownerPassword = await bcrypt.hash('owner123', 10);
  const gymOwner = await prisma.user.create({
    data: {
      gymId: demoGym.id,
      email: 'owner@titanfitness.com',
      passwordHash: ownerPassword,
      firstName: 'John',
      lastName: 'Owner',
      role: Role.GYM_OWNER,
      adminProfile: {
        create: { department: 'Management' }
      }
    }
  });
  console.log('Created Gym Owner:', gymOwner.email);

  // 5. Create Gym Membership Plans
  const monthlyPlan = await prisma.membershipPlan.create({
    data: {
      gymId: demoGym.id,
      name: 'Standard Monthly',
      price: 29.99,
      durationDays: 30,
      type: PlanType.MONTHLY
    }
  });

  // 6. Create a Demo Member
  const memberPassword = await bcrypt.hash('member123', 10);
  const demoMember = await prisma.user.create({
    data: {
      gymId: demoGym.id,
      email: 'member@example.com',
      passwordHash: memberPassword,
      firstName: 'Alice',
      lastName: 'Smith',
      role: Role.MEMBER,
      memberProfile: {
        create: {
          gender: Gender.FEMALE,
          height: 165,
          weight: 60,
          fitnessGoal: 'Cardio',
          qrCodeData: 'titan-alice-uuid-1234'
        }
      }
    }
  });
  console.log('Created Demo Member:', demoMember.email);

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
