import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { DatabaseService } from '../database/database.service';

@Controller('api/notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private prisma: DatabaseService
  ) {}

  @Get('logs')
  getLogs() {
    return this.notificationsService.getAllLogs();
  }

  @Post('push-token')
  async savePushToken(@Body() body: { userId: string, token: string }) {
    await this.prisma.tenant.user.update({
      where: { id: body.userId },
      data: { pushToken: body.token }
    });
    return { success: true };
  }
}
