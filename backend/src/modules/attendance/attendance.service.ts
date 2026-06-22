import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as QRCode from 'qrcode';

@Injectable()
export class AttendanceService {
  constructor(private prisma: DatabaseService) {}

  async checkIn(identifier: string, type: 'MOBILE' | 'QR') {
    let member;

    if (type === 'QR') {
      member = await this.prisma.memberProfile.findUnique({
        where: { qrCodeData: identifier },
        include: { user: true, renewals: { where: { status: 'ACTIVE' } } }
      });
    } else {
      const user = await this.prisma.user.findFirst({
        where: { phoneNumber: identifier, role: 'MEMBER' },
        include: { memberProfile: { include: { renewals: { where: { status: 'ACTIVE' } } } } }
      });
      if (user) member = user.memberProfile;
    }

    if (!member) throw new NotFoundException('Member not found');
    if (member.renewals.length === 0) throw new BadRequestException('Member does not have an active subscription');

    // Create a new attendance record
    const attendance = await this.prisma.attendance.create({
      data: {
        memberId: member.id,
      }
    });

    return { message: 'Check-in successful', attendance, member: member.user };
  }

  async checkOut(identifier: string, type: 'MOBILE' | 'QR') {
    let member;

    if (type === 'QR') {
      member = await this.prisma.memberProfile.findUnique({
        where: { qrCodeData: identifier }
      });
    } else {
      const user = await this.prisma.user.findFirst({
        where: { phoneNumber: identifier, role: 'MEMBER' },
        include: { memberProfile: true }
      });
      if (user) member = user.memberProfile;
    }

    if (!member) throw new NotFoundException('Member not found');

    // Find latest open check-in
    const openRecord = await this.prisma.attendance.findFirst({
      where: { memberId: member.id, checkOutTime: null },
      orderBy: { checkInTime: 'desc' }
    });

    if (!openRecord) throw new BadRequestException('No open check-in found for this member');

    const updated = await this.prisma.attendance.update({
      where: { id: openRecord.id },
      data: { checkOutTime: new Date() }
    });

    return { message: 'Check-out successful', attendance: updated };
  }

  async getHistory() {
    return this.prisma.attendance.findMany({
      orderBy: { checkInTime: 'desc' },
      include: {
        member: { include: { user: true } }
      },
      take: 100 // Limiting for simplicity
    });
  }

  async getReports() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkInsToday = await this.prisma.attendance.count({
      where: { checkInTime: { gte: today } }
    });

    const currentlyInGym = await this.prisma.attendance.count({
      where: { checkOutTime: null }
    });

    return {
      checkInsToday,
      currentlyInGym
    };
  }

  async generateQRCode(memberId: string) {
    const member = await this.prisma.memberProfile.findUnique({ where: { id: memberId } });
    if (!member) throw new NotFoundException('Member not found');

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(member.qrCodeData);
      return { qrCodeDataUrl };
    } catch (err) {
      throw new BadRequestException('Failed to generate QR Code');
    }
  }
}
