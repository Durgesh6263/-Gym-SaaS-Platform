import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlansService } from './plans.service';

@Controller('api/plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  findAll(@Query('all') all?: boolean) {
    return this.plansService.findAll(all);
  }

  @Post()
  create(@Body() data: any) {
    return this.plansService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.plansService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plansService.softDelete(id);
  }
}
