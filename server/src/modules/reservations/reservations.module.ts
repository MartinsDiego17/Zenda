import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { MercadoPagoModule } from '../mercado-pago/mercado-pago.module';
import { PaymentsModule } from '../payments/payments.module';
import { ProfessionalSettingsModule } from '../professional-settings/professional-settings.module';
import { ProfilesModule } from '../profiles/profiles.module';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
  imports: [MercadoPagoModule, PaymentsModule, ProfessionalSettingsModule, ProfilesModule]
})
export class ReservationsModule {}
