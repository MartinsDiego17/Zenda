import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PaymentsService {

  constructor(
    private readonly supabaseService: SupabaseService,
  ) { }

  async create(infoPayment) {
    const response = await this.supabaseService
      .getClient()
      .from('payments')
      .insert(infoPayment);
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
