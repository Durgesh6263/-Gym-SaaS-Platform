import { Module } from '@nestjs/common';
import { RenewalsService } from './renewals.service';
import { RenewalsController } from './renewals.controller';

@Module({
  providers: [RenewalsService],
  controllers: [RenewalsController]
})
export class RenewalsModule {}
