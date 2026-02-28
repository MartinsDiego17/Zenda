import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProfessionalSettingsService } from './professional-settings.service';
import { CreateProfessionalSettingDto } from './dto/create-professional-setting.dto';
import { UpdateProfessionalSettingDto } from './dto/update-professional-setting.dto';

@Controller('professional-settings')
export class ProfessionalSettingsController {
  constructor(private readonly professionalSettingsService: ProfessionalSettingsService) { }

  @Post()
  create(@Body() createProfessionalSettingDto: CreateProfessionalSettingDto) {
    return this.professionalSettingsService.create(createProfessionalSettingDto);
  }

  @Get()
  async get() {
    const professionalSettings = await this.professionalSettingsService.get();
    return professionalSettings;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalSettingsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProfessionalSettingDto,
  ) {
    return this.professionalSettingsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalSettingsService.remove(+id);
  }
}
