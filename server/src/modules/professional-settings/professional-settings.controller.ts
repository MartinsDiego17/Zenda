import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionalSettingsService } from './professional-settings.service';
import { CreateProfessionalSettingDto } from './dto/create-professional-setting.dto';
import { UpdateProfessionalSettingDto } from './dto/update-professional-setting.dto';

@Controller('professional-settings')
export class ProfessionalSettingsController {
  constructor(private readonly professionalSettingsService: ProfessionalSettingsService) { }
  @Get()
  async get() {
    const professionalSettings = await this.professionalSettingsService.get();
    return professionalSettings;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProfessionalSettingDto,
  ) {
    return this.professionalSettingsService.update(id, dto);
  }
}