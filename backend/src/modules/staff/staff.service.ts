import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { StaffPermission } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private prisma: DatabaseService) {}

  async findAll() {
    return this.prisma.staffProfile.findMany({
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true, isActive: true }
        }
      }
    });
  }

  async findOne(id: string) {
    const staff = await this.prisma.staffProfile.findUnique({
      where: { id },
      include: { user: true }
    });
    if (!staff) throw new NotFoundException('Staff member not found');
    return staff;
  }

  async create(data: { email: string, firstName: string, lastName: string, position: string, shift?: string, permissions: StaffPermission[] }) {
    // In a real app, hash a random password and send email.
    const tempPasswordHash = 'hashed_temp_password'; 
    return this.prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash: tempPasswordHash,
        role: 'STAFF',
        staffProfile: {
          create: {
            position: data.position,
            shift: data.shift,
            permissions: data.permissions
          }
        }
      },
      include: { staffProfile: true }
    });
  }

  async update(id: string, data: { position?: string, permissions?: StaffPermission[] }) {
    return this.prisma.staffProfile.update({
      where: { id },
      data: {
        position: data.position,
        permissions: data.permissions,
      }
    });
  }

  async toggleSuspend(id: string) {
    const staff = await this.findOne(id);
    return this.prisma.user.update({
      where: { id: staff.userId },
      data: { isActive: !staff.user.isActive }
    });
  }

  async delete(id: string) {
    const staff = await this.findOne(id);
    return this.prisma.user.delete({
      where: { id: staff.userId }
    });
  }
}
