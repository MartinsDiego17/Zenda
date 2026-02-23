import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { extractPaymentId } from './utils/extractPaymentId';
import { ProfessionalSettingsService } from '../professional-settings/professional-settings.service';

@Controller('reservations')
export class ReservationsController {

  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly professionalSettingsxService: ProfessionalSettingsService
  ) { }

  @Post('/create-without-payment')
  async createReservationWithoutPayment(@Body() infoPayment) {
    const responseSettings = await this.professionalSettingsxService.get();
    const objectReturn: any = {
      data: {},
      status: 1
    }
    if (responseSettings.data) {
      const requiresDeposit = responseSettings.data[0].requires_deposit;
      if (!requiresDeposit) {
        const data = await this.reservationsService.createReservationWithoutPayment(infoPayment);
        objectReturn.data = data;
        objectReturn.status = 200;
      }
    }
    return objectReturn;
  }


  @Post('/create-with-payment')
  async createReservationWithPayment(@Body() infoPayment) {

    const paymentId = extractPaymentId(infoPayment);
    if (!paymentId) return { status: 200 };

    const data = await this.reservationsService.createReservationWithPayment(infoPayment);
    return {
      data,
      status: 200
    }
  }

  @Post('/payment')
  async createPreference(@Body() infoReservation) {
    return this.reservationsService.createPreference({ infoReservation });
  }

  @Get()
  async findAll() {
    try {
      return {
        status: 200,
        data: await this.reservationsService.findAll(),
        message: "SOLICITASTE TODAS LAS RESERVAS DE TODOS LOS USUARIOS EXITOSAMENTE"
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/user/:client_id')
  async findAllByUser(@Param('client_id') client_id: string) {
    try {
      return {
        status: 200,
        data: await this.reservationsService.findAllByUser({ client_id }),
        message: `SOLICITASTE TODAS LAS RESERVAS DEL USUARIO CON EL ID: ${client_id} EXITOSAMENTE`
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/availability')
  async getAvailability(
    @Query('date') date: string,
    @Query('professional_id') professional_id: string,
  ) {
    return this.reservationsService.getAvailability(date, professional_id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }

}
