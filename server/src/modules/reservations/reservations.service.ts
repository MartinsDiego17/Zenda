import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { MercadoPagoService } from '../mercado-pago/mercado-pago.service';
import { Reservation } from './types/reservations';
import { Payment, Preference } from 'mercadopago';
import { PaymentsService } from '../payments/payments.service';
import { PaymentProps } from 'shared/db/payment';
import { formattedReservation } from './utils/formattedReservation';

@Injectable()
export class ReservationsService {

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly mercadoPago: MercadoPagoService,
    private readonly PaymentsService: PaymentsService
  ) { }

  async createReservationWithoutPayment(infoPayment) {
    const newReservation = formattedReservation(infoPayment);
    const responseReservation = await this.supabaseService
      .getClient()
      .from('reservations')
      .insert(newReservation)
      .select()
      .single();
    return responseReservation;
  }

  async createReservationWithPayment(infoPayment) {

    const localSupabaseClient = await this.supabaseService.getClient();

    const payment = await new Payment(this.mercadoPago.getMercadoPago()).get({ id: infoPayment.data.id });
    const { info_reservation } = payment.metadata;
    const { deposit_amount, reservation } = info_reservation;
    if (payment.status === "approved") {

      const newReservation = formattedReservation(reservation);

      let responsePayment;
      const responseReservation = await localSupabaseClient
        .from('reservations')
        .insert(newReservation)
        .select()
        .single();

      if (!responseReservation.error) {
        const newPayment = {
          reservation_id: responseReservation.data.id,
          amount: deposit_amount,
          status: "PAID",
          payment_provider: "Mercado Pago",
          external_payment_id: payment.id,
        }
        responsePayment = await this.PaymentsService.create(newPayment);
      }

      const finalResponse = {
        reservation: responseReservation,
        payment: responsePayment
      }

      return finalResponse;

    }

    return payment;
  }

  async createPreference({ infoReservation }: { infoReservation: CreateReservationDto }) {
    const preference = await new Preference(this.mercadoPago.getMercadoPago() as any).create({
      body: {
        items: [{
          id: infoReservation.reservation.id,
          title: "Pago de seña de reserva",
          quantity: 1,
          unit_price: 1 /* infoReservation.deposit_amount */
        }],
        metadata: {
          infoReservation
        },
        notification_url: "https://unspayed-renay-unmutualized.ngrok-free.dev/api/reservations/create-with-payment"
      }
    })
    return { data: preference.init_point }
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
    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getAvailability(date: string, professionalId: string) {

    const day = date.split(" ")[0];
    const nextDay = new Date(day);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split("T")[0];

    const response = await this.supabaseService
      .getClient()
      .from("reservations")
      .select('*')
      .eq('professional_id', professionalId)
      .gte('start_time', `${day}T00:00:00`)
      .lt('start_time', `${nextDayStr}T00:00:00`);

    const finalSlots: string[] = []

    response.data?.forEach((subDate: Reservation) => {
      finalSlots.push(subDate.start_time);
    })

    return {
      date: day,
      timezone: "",
      occupiedSlots: finalSlots,
    };
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
