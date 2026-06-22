import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: DatabaseService) {}

  async getStats() {
    const totalMembers = await this.prisma.user.count({ where: { role: 'MEMBER' } });
    const totalStaff = await this.prisma.user.count({ where: { role: 'STAFF' } });
    
    const activeMembers = await this.prisma.membershipRenewal.count({
      where: { status: 'ACTIVE' },
    });
    
    const expiredMembers = await this.prisma.membershipRenewal.count({
      where: { status: 'EXPIRED' },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayPayments = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: { paymentDate: { gte: today }, status: 'COMPLETED' },
    });

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const monthlyPayments = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: { paymentDate: { gte: firstDayOfMonth }, status: 'COMPLETED' },
    });

    return {
      totalMembers,
      activeMembers,
      expiredMembers,
      totalStaff,
      todayCollection: todayPayments._sum.amount || 0,
      monthlyRevenue: monthlyPayments._sum.amount || 0,
    };
  }

  async getRecentPayments() {
    return this.prisma.payment.findMany({
      take: 10,
      orderBy: { paymentDate: 'desc' },
      include: { user: { select: { firstName: true, lastName: true, email: true } } },
    });
  }

  async getRecentRegistrations() {
    return this.prisma.user.findMany({
      take: 10,
      where: { role: 'MEMBER' },
      orderBy: { createdAt: 'desc' },
      select: { id: true, firstName: true, lastName: true, email: true, createdAt: true },
    });
  }
}
