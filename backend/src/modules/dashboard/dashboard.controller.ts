import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/dashboard')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles('ADMIN')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats() {
    return this.dashboardService.getStats();
  }

  @Get('recent-payments')
  getRecentPayments() {
    return this.dashboardService.getRecentPayments();
  }

  @Get('recent-registrations')
  getRecentRegistrations() {
    return this.dashboardService.getRecentRegistrations();
  }
}
