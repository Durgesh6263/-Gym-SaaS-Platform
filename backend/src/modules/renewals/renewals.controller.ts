import { Controller, Post, Body, Get, Param, Request } from '@nestjs/common';
import { RenewalsService } from './renewals.service';
import { PaymentMethod } from '@prisma/client';

@Controller('api/renewals')
export class RenewalsController {
  constructor(private readonly renewalsService: RenewalsService) {}

  @Post()
  processRenewal(
    @Body() data: { memberId: string, planId: string, paymentMethod: PaymentMethod },
    @Request() req: any
  ) {
    // In reality, processedById comes from req.user.id
    const processedById = req.user?.id || 'mocked-staff-id';
    return this.renewalsService.processRenewal({ ...data, processedById });
  }

  @Get(':id/receipt')
  getReceipt(@Param('id') id: string) {
    return this.renewalsService.getReceipt(id);
  }
}
