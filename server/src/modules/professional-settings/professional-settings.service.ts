import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfessionalSettingDto } from './dto/create-professional-setting.dto';
import { UpdateProfessionalSettingDto } from './dto/update-professional-setting.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { ProfessionalSettingsTable } from 'shared/db/professional_settings';

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

async update(id: string, dto: UpdateProfessionalSettingDto): Promise<ProfessionalSettingsTable> {
    const { data, error } = await this.supabaseService
        .getClient()
        .from('professional_settings')
        .update({
            user_id: dto.user_id,
            session_duration_minutes: dto.session_duration_minutes,
            work_days: dto.work_days,
            work_start_time: dto.work_start_time,
            work_end_time: dto.work_end_time,
            reservation_window_days: dto.reservation_window_days,
            requires_deposit: dto.requires_deposit,
            deposit_amount: dto.requires_deposit ? (dto.deposit_amount ?? null) : null,
            session_modalities: dto.session_modalities,
            office_address: dto.session_modalities !== 'Virtual' ? (dto.office_address ?? null) : null,
        })
        .eq('id', id)
        .select()
        .single();

    if (error) throw new NotFoundException(`No se encontró la configuración con id ${id}: ${error.message}`);

    return data;
}

  

  remove(id: number) {
    return `This action removes a #${id} professionalSetting`;
  }
}
