import { Injectable } from '@nestjs/common';
import { CreateProfessionalSettingDto } from './dto/create-professional-setting.dto';
import { UpdateProfessionalSettingDto } from './dto/update-professional-setting.dto';

@Injectable()
export class ProfessionalSettingsService {
  create(createProfessionalSettingDto: CreateProfessionalSettingDto) {
    return 'This action adds a new professionalSetting';
  }

  findAll() {
    return `This action returns all professionalSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} professionalSetting`;
  }

  update(id: number, updateProfessionalSettingDto: UpdateProfessionalSettingDto) {
    return `This action updates a #${id} professionalSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} professionalSetting`;
  }
}
