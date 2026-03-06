import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, AuthGuard],
  exports: [PaymentsService]
})
export class PaymentsModule {}
