import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { PaymentMethod } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RenewalsService {
  constructor(private prisma: DatabaseService, private eventEmitter: EventEmitter2) {}

  async processRenewal(data: { memberId: string, planId: string, paymentMethod: PaymentMethod, processedById: string }) {
    const member = await this.prisma.memberProfile.findUnique({
      where: { id: data.memberId },
      include: { renewals: { where: { status: 'ACTIVE' }, orderBy: { endDate: 'desc' }, take: 1 } },
    });
    if (!member) throw new NotFoundException('Member not found');

    const plan = await this.prisma.membershipPlan.findUnique({ where: { id: data.planId } });
    if (!plan) throw new NotFoundException('Plan not found');

    let startDate = new Date();
    if (member.renewals.length > 0) {
      const currentEndDate = member.renewals[0].endDate;
      if (currentEndDate > startDate) {
        startDate = new Date(currentEndDate);
      }
    }

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.durationDays);

    let finalPrice = plan.price;
    if (plan.discount && plan.discount.toNumber() > 0) {
      finalPrice = plan.price.toNumber() * (1 - plan.discount.toNumber() / 100) as any;
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          userId: member.userId,
          amount: finalPrice,
          method: data.paymentMethod,
          status: 'COMPLETED',
        },
      });

      const renewal = await tx.membershipRenewal.create({
        data: {
          memberId: member.id,
          planId: plan.id,
          startDate,
          endDate,
          status: 'ACTIVE',
          paymentId: payment.id,
          processedById: data.processedById,
        },
      });

      return { payment, renewal };
    });

    this.eventEmitter.emit('payment.success', { userId: member.userId, amount: result.payment.amount });
    this.eventEmitter.emit('renewal.confirmed', { userId: member.userId, planName: plan.name });

    return result;
  }

  async getReceipt(id: string) {
    const renewal = await this.prisma.membershipRenewal.findUnique({
      where: { id },
      include: {
        member: { include: { user: true } },
        plan: true,
        payment: true,
        processedBy: true,
      },
    });

    if (!renewal) throw new NotFoundException('Renewal not found');
    return renewal;
  }
}
