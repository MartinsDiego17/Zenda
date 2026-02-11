import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ReservationsService {

  constructor(
    private readonly supabaseService: SupabaseService
  ) { }

  create(createReservationDto: CreateReservationDto) {
    return 'This action adds a new reservation';
  }

  async findAll() {
    const { data } = await this.supabaseService.getClient().from('reservations').select('*');
    return data;
  }

async findAllByUser({ client_id }: { client_id: string }) {
  const { data, error } = await this.supabaseService
    .getClient()
    .from('reservations')
    .select('*')
    .eq('client_id', client_id);

    console.log("DATA: ", data);
  if (error) {
    throw new Error(error.message);
  }

  return data;
}


  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
