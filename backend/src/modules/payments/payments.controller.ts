import { Controller, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('reports')
  getReports() {
    return this.paymentsService.getReports();
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id/receipt')
  getReceipt(@Param('id') id: string) {
    return this.paymentsService.getReceipt(id);
  }
}
