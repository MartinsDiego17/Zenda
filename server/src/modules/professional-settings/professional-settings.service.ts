import { Injectable } from '@nestjs/common';
import { CreateProfessionalSettingDto } from './dto/create-professional-setting.dto';
import { UpdateProfessionalSettingDto } from './dto/update-professional-setting.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProfessionalSettingsService {

    constructor(
      private readonly supabaseService: SupabaseService
    ) { }

  create(createProfessionalSettingDto: CreateProfessionalSettingDto) {
    return 'This action adds a new professionalSetting';
  }

  async get() {
    const response = await this.supabaseService.getClient().from('professional_settings').select('*');
    return response;
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
