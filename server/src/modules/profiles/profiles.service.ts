import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly supabaseService: SupabaseService
  ) { }

  async findAll() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('profiles')
      .select('*')
      .neq('role', 'ADMIN');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findOne({ userId }: { userId: string }) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('profiles')
      .select('*')
      .eq('id', userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async update({ userId, updateProfileDto }: { userId: string, updateProfileDto: UpdateProfileDto }) {

    updateProfileDto.is_profile_complete = true;
    const { data, error } = await this.supabaseService
      .getClient()
      .from('profiles')
      .update(updateProfileDto)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}