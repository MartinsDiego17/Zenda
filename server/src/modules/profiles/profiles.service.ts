import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProfilesService {


  constructor(
    private readonly supabaseService: SupabaseService
  ) { }

  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

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

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
