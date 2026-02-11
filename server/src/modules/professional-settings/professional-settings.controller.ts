import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionalSettingsService } from './professional-settings.service';
import { CreateProfessionalSettingDto } from './dto/create-professional-setting.dto';
import { UpdateProfessionalSettingDto } from './dto/update-professional-setting.dto';

@Controller('professional-settings')
export class ProfessionalSettingsController {
  constructor(private readonly professionalSettingsService: ProfessionalSettingsService) {}

  @Post()
  create(@Body() createProfessionalSettingDto: CreateProfessionalSettingDto) {
    return this.professionalSettingsService.create(createProfessionalSettingDto);
  }

  @Get()
  findAll() {
    return this.professionalSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionalSettingDto: UpdateProfessionalSettingDto) {
    return this.professionalSettingsService.update(+id, updateProfessionalSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalSettingsService.remove(+id);
  }
}
