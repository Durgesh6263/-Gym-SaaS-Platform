import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Gender } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(private prisma: DatabaseService) {}

  async findAll(search?: string) {
    const whereClause = search
      ? {
          role: 'MEMBER' as any,
          OR: [
            { firstName: { contains: search, mode: 'insensitive' as any } },
            { lastName: { contains: search, mode: 'insensitive' as any } },
            { email: { contains: search, mode: 'insensitive' as any } },
          ],
        }
      : { role: 'MEMBER' as any };

    return this.prisma.user.findMany({
      where: whereClause,
      include: {
        memberProfile: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id, role: 'MEMBER' },
      include: {
        memberProfile: {
          include: { renewals: { include: { plan: true } } },
        },
      },
    });
    if (!user) throw new NotFoundException('Member not found');
    return user;
  }

  async create(data: any) {
    const tempPasswordHash = 'hashed_member_password';
    return this.prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        passwordHash: tempPasswordHash,
        role: 'MEMBER',
        memberProfile: {
          create: {
            gender: data.gender,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
            address: data.address,
            height: data.height,
            weight: data.weight,
            fitnessGoal: data.fitnessGoal,
            emergencyContact: data.emergencyContact,
            medicalNotes: data.medicalNotes,
            photoUrl: data.photoUrl || 'https://via.placeholder.com/150',
          },
        },
      },
      include: { memberProfile: true },
    });
  }

  async update(id: string, data: any) {
    const member = await this.findOne(id);
    
    // Simplistic update for demonstration
    return this.prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        memberProfile: {
          update: {
            gender: data.gender,
            address: data.address,
            height: data.height,
            weight: data.weight,
            fitnessGoal: data.fitnessGoal,
            emergencyContact: data.emergencyContact,
            medicalNotes: data.medicalNotes,
          },
        },
      },
      include: { memberProfile: true },
    });
  }
}
