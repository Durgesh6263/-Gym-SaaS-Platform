import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PaymentsService {
  constructor(private prisma: DatabaseService, private eventEmitter: EventEmitter2) {}

  async findAll() {
    return this.prisma.payment.findMany({
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: { paymentDate: 'desc' },
    });
  }

  async getReports() {
    const now = new Date();
    
    // Start of Day
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    // Start of Week (assuming Monday is start)
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay() || 7;
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - day + 1);

    // Start of Month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [daily, weekly, monthly, byMethod] = await Promise.all([
      this.prisma.payment.aggregate({
        where: { paymentDate: { gte: startOfDay }, status: 'COMPLETED' },
        _sum: { amount: true },
      }),
      this.prisma.payment.aggregate({
        where: { paymentDate: { gte: startOfWeek }, status: 'COMPLETED' },
        _sum: { amount: true },
      }),
      this.prisma.payment.aggregate({
        where: { paymentDate: { gte: startOfMonth }, status: 'COMPLETED' },
        _sum: { amount: true },
      }),
      this.prisma.payment.groupBy({
        by: ['method'],
        where: { paymentDate: { gte: startOfMonth }, status: 'COMPLETED' },
        _sum: { amount: true },
      })
    ]);

    return {
      dailyCollection: daily._sum.amount || 0,
      weeklyCollection: weekly._sum.amount || 0,
      monthlyCollection: monthly._sum.amount || 0,
      collectionsByMethod: byMethod.map(m => ({
        method: m.method,
        amount: m._sum.amount || 0,
      })),
    };
  }

  async getReceipt(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        user: true,
        renewal: { include: { plan: true } }
      }
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }
}
