import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService, tenantContext } from '../database/database.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationChannel, NotificationStatus } from '@prisma/client';
import { Expo } from 'expo-server-sdk';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private expo = new Expo();

  constructor(private prisma: DatabaseService) {}

  // 1. CRON JOB: Expiry Reminders
  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async handleExpiryReminders() {
    this.logger.log('Running daily membership expiry check...');
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    // Bypassing tenant isolation for cron by not using tenantContext
    const expiringRenewals = await this.prisma.membershipRenewal.findMany({
      where: {
        status: 'ACTIVE',
        endDate: {
          gte: new Date(),
          lte: threeDaysFromNow,
        },
      },
      include: { member: { include: { user: true } }, gym: true },
    });

    for (const renewal of expiringRenewals) {
      // Create isolated context to dispatch notification under the correct tenant
      tenantContext.run({ gymId: renewal.gymId }, async () => {
        await this.queueNotification(
          renewal.member.userId,
          'Membership Expiring Soon',
          `Hi ${renewal.member.user.firstName}, your gym membership expires on ${renewal.endDate.toDateString()}. Please renew to avoid interruption.`,
          'PUSH'
        );
      });
    }
  }

  // 2. EVENT LISTENER: Payment Success
  @OnEvent('payment.success', { async: true })
  async handlePaymentSuccess(payload: { userId: string, amount: number }) {
    await this.queueNotification(
      payload.userId,
      'Payment Successful',
      `We have received your payment of $${payload.amount}. Thank you!`,
      'PUSH'
    );
  }

  // 3. EVENT LISTENER: Renewal Confirmed
  @OnEvent('renewal.confirmed', { async: true })
  async handleRenewalConfirmed(payload: { userId: string, planName: string }) {
    await this.queueNotification(
      payload.userId,
      'Membership Renewed',
      `Your ${payload.planName} membership has been successfully renewed.`,
      'PUSH'
    );
  }

  // CORE LOGIC: Queue and Process Notification
  async queueNotification(userId: string, title: string, message: string, channel: NotificationChannel) {
    // 1. Log Pending Notification to Database
    const notification = await this.prisma.tenant.notification.create({
      data: {
        userId,
        title,
        message,
        channel,
        status: 'PENDING',
      },
    });

    this.logger.log(`Queued ${channel} notification [${notification.id}] for User ${userId}`);

    // 2. Process via Expo Server SDK if PUSH
    if (channel === 'PUSH') {
      try {
        const user = await this.prisma.tenant.user.findUnique({ where: { id: userId } });
        
        if (!user?.pushToken || !Expo.isExpoPushToken(user.pushToken)) {
          throw new Error('User has no valid push token');
        }

        const messages = [{
          to: user.pushToken,
          sound: 'default' as any,
          title: title,
          body: message,
          data: { withSome: 'data' },
        }];

        const chunks = this.expo.chunkPushNotifications(messages);
        for (const chunk of chunks) {
          await this.expo.sendPushNotificationsAsync(chunk);
        }

        // Success
        await this.prisma.tenant.notification.update({
          where: { id: notification.id },
          data: { status: 'SENT' },
        });
        this.logger.log(`Sent PUSH notification [${notification.id}]`);

      } catch (error: any) {
        // Failure
        await this.prisma.tenant.notification.update({
          where: { id: notification.id },
          data: { status: 'FAILED', errorLog: error.message },
        });
        this.logger.error(`Failed to send PUSH notification [${notification.id}]: ${error.message}`);
      }
    }
  }

  async getAllLogs() {
    return this.prisma.tenant.notification.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { firstName: true, lastName: true } } },
    });
  }
}
