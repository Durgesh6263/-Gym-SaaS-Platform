import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('checkin')
  checkIn(@Body() data: { identifier: string, type: 'MOBILE' | 'QR' }) {
    return this.attendanceService.checkIn(data.identifier, data.type);
  }

  @Post('checkout')
  checkOut(@Body() data: { identifier: string, type: 'MOBILE' | 'QR' }) {
    return this.attendanceService.checkOut(data.identifier, data.type);
  }

  @Get('history')
  getHistory() {
    return this.attendanceService.getHistory();
  }

  @Get('reports')
  getReports() {
    return this.attendanceService.getReports();
  }

  @Get('qr/:memberId')
  generateQRCode(@Param('memberId') memberId: string) {
    return this.attendanceService.generateQRCode(memberId);
  }
}
