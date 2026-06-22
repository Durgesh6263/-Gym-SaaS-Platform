import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { PlanType } from '@prisma/client';

@Injectable()
export class PlansService {
  constructor(private prisma: DatabaseService) {}

  async findAll(includeInactive = false) {
    return this.prisma.membershipPlan.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: { price: 'asc' },
    });
  }

  async findOne(id: string) {
    const plan = await this.prisma.membershipPlan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('Plan not found');
    return plan;
  }

  async create(data: { name: string, description?: string, price: number, type: PlanType, discount?: number, durationDays: number }) {
    return this.prisma.membershipPlan.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        type: data.type,
        discount: data.discount,
        durationDays: data.durationDays,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.membershipPlan.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string) {
    return this.prisma.membershipPlan.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
