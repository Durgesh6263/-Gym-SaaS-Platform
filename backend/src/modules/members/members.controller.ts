import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('api/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll(@Query('search') search?: string) {
    return this.membersService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.membersService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.membersService.update(id, data);
  }
}
