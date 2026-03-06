import { Module } from '@nestjs/common';
import { ProfessionalSettingsService } from './professional-settings.service';
import { ProfessionalSettingsController } from './professional-settings.controller';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  controllers: [ProfessionalSettingsController],
  providers: [ProfessionalSettingsService, AuthGuard, RolesGuard],
  exports: [ProfessionalSettingsService]
})
export class ProfessionalSettingsModule {}
