import { Module } from '@nestjs/common';
import { ProfessionalSettingsService } from './professional-settings.service';
import { ProfessionalSettingsController } from './professional-settings.controller';

@Module({
  controllers: [ProfessionalSettingsController],
  providers: [ProfessionalSettingsService],
  exports: [ProfessionalSettingsService]
})
export class ProfessionalSettingsModule {}
