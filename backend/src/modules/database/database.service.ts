import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AsyncLocalStorage } from 'async_hooks';

export const tenantContext = new AsyncLocalStorage<{ gymId: string }>();

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public readonly tenant;

  constructor() {
    super();

    // Create a Prisma extension that automatically intercepts queries
    // and injects the `gymId` from the current AsyncLocalStorage context.
    this.tenant = this.$extends({
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }) {
            const context = tenantContext.getStore();
            
            // Models that require tenant isolation
            const tenantModels = ['User', 'MembershipPlan', 'MembershipRenewal', 'Payment', 'Attendance', 'Notification'];
            
            if (context?.gymId && tenantModels.includes(model)) {
              // Inject gymId into the where clause for finds/updates/deletes
              if (['findUnique', 'findFirst', 'findMany', 'update', 'updateMany', 'delete', 'deleteMany', 'count'].includes(operation)) {
                args.where = { ...args.where, gymId: context.gymId };
              }
              // Inject gymId into data for creates
              if (['create', 'createMany'].includes(operation)) {
                if (Array.isArray(args.data)) {
                  args.data = args.data.map(d => ({ ...d, gymId: context.gymId }));
                } else {
                  args.data = { ...args.data, gymId: context.gymId };
                }
              }
            }
            return query(args);
          },
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
