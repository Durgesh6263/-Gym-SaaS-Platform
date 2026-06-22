import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffPermission } from '@prisma/client';

@Controller('api/staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @Post()
  create(@Body() data: { email: string, firstName: string, lastName: string, position: string, shift?: string, permissions: StaffPermission[] }) {
    return this.staffService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: { position?: string, permissions?: StaffPermission[] }) {
    return this.staffService.update(id, data);
  }

  @Patch(':id/suspend')
  toggleSuspend(@Param('id') id: string) {
    return this.staffService.toggleSuspend(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.delete(id);
  }
}
