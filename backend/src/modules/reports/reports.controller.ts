import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('revenue')
  getRevenue(@Query('filter') filter: string = 'monthly') {
    return this.reportsService.getRevenueReport(filter);
  }

  @Get('membership')
  getMembership(@Query('filter') filter: string = 'monthly') {
    return this.reportsService.getMembershipReport(filter);
  }

  @Get('attendance')
  getAttendance(@Query('filter') filter: string = 'monthly') {
    return this.reportsService.getAttendanceReport(filter);
  }

  @Get('staff-performance')
  getStaffPerformance(@Query('filter') filter: string = 'monthly') {
    return this.reportsService.getStaffPerformanceReport(filter);
  }
}
