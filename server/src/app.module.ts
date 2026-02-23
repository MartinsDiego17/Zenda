import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ProfessionalSettingsModule } from './modules/professional-settings/professional-settings.module';
import { MercadoPagoModule } from './modules/mercado-pago/mercado-pago.module';
import configurationEnviroment from './config/configuration-enviroment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env/development.env',
      load: [configurationEnviroment],
    }),
    SupabaseModule,
    ProfilesModule,
    ReservationsModule,
    PaymentsModule,
    ProfessionalSettingsModule,
    MercadoPagoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
