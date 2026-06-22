import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: DatabaseService) {}

  private getDateFilter(filter: string) {
    const now = new Date();
    const startDate = new Date();
    
    switch (filter) {
      case 'daily':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'weekly':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'monthly':
        startDate.setMonth(now.getMonth() - 1);
        break;
      default:
        // default to monthly if custom or invalid
        startDate.setMonth(now.getMonth() - 1);
    }
    return { gte: startDate, lte: now };
  }

  async getRevenueReport(filter: string) {
    const dateRange = this.getDateFilter(filter);
    
    const payments = await this.prisma.payment.findMany({
      where: {
        createdAt: dateRange,
        status: 'COMPLETED'
      },
      select: { amount: true, method: true, createdAt: true }
    });

    const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const byMethod = payments.reduce((acc: any, p) => {
      acc[p.method] = (acc[p.method] || 0) + Number(p.amount);
      return acc;
    }, {});

    return { totalRevenue, byMethod, payments };
  }

  async getMembershipReport(filter: string) {
    const dateRange = this.getDateFilter(filter);
    
    const renewals = await this.prisma.membershipRenewal.findMany({
      where: { createdAt: dateRange },
      include: { plan: true }
    });

    return {
      totalRenewals: renewals.length,
      renewals
    };
  }

  async getAttendanceReport(filter: string) {
    const dateRange = this.getDateFilter(filter);
    
    const logs = await this.prisma.attendanceLog.findMany({
      where: { checkIn: dateRange },
    });

    return {
      totalCheckIns: logs.length,
      logs
    };
  }

  async getStaffPerformanceReport(filter: string) {
    const dateRange = this.getDateFilter(filter);
    
    // Group renewals by processedById
    const renewals = await this.prisma.membershipRenewal.findMany({
      where: { createdAt: dateRange },
      include: { processedBy: true, payment: true }
    });

    const performanceMap = new Map();
    
    renewals.forEach(r => {
      if (!r.processedBy || !r.payment) return;
      const staffId = r.processedBy.id;
      if (!performanceMap.has(staffId)) {
        performanceMap.set(staffId, {
          staffName: r.processedBy.fullName || r.processedBy.email,
          totalRenewalsProcessed: 0,
          revenueGenerated: 0
        });
      }
      
      const stats = performanceMap.get(staffId);
      stats.totalRenewalsProcessed += 1;
      stats.revenueGenerated += Number(r.payment.amount);
    });

    return Array.from(performanceMap.values());
  }
}
