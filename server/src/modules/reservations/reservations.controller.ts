import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { extractPaymentId } from './utils/extractPaymentId';
import { ProfessionalSettingsService } from '../professional-settings/professional-settings.service';
import { Reservation } from './types/reservations';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('Reservations')
@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {

  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly professionalSettingsxService: ProfessionalSettingsService
  ) { }

  @Post('/create-without-payment')
  @ApiOperation({
    summary: 'Crear reserva sin pago',
    description: 'Crea una reserva sin requerir pago previo. Solo funciona si la configuración del profesional no requiere depósito, o si es un bloqueo manual del profesional.',
  })
  @ApiBody({ description: 'Información de la reserva incluyendo client_id y professional_id' })
  @ApiResponse({ status: 200, description: 'Reserva creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al crear la reserva.' })
  async createReservationWithoutPayment(@Body() infoPayment) {
    const responseSettings = await this.professionalSettingsxService.get();
    const objectReturn: any = { data: {}, status: 1 }
    if (responseSettings.data) {
      const requiresDeposit = responseSettings.data[0].requires_deposit;
      const { client_id, professional_id } = infoPayment;
      const isManualBlock = client_id === professional_id;
      if (!requiresDeposit || isManualBlock) {
        const data = await this.reservationsService.createReservationWithoutPayment(infoPayment);
        objectReturn.data = data;
        objectReturn.status = 200;
      }
    }
    return objectReturn;
  }

  @Post('/create-with-payment')
  @ApiOperation({
    summary: 'Crear reserva con pago',
    description: 'Crea una reserva asociada a un pago. Extrae el ID de pago del cuerpo de la solicitud; si no se encuentra, retorna status 200 sin crear la reserva.',
  })
  @ApiBody({ description: 'Información del pago y la reserva' })
  @ApiResponse({ status: 200, description: 'Reserva creada exitosamente con pago asociado.' })
  @ApiResponse({ status: 400, description: 'Error al procesar el pago o crear la reserva.' })
  async createReservationWithPayment(@Body() infoPayment) {
    const paymentId = extractPaymentId(infoPayment);
    if (!paymentId) return { status: 200 };
    const data = await this.reservationsService.createReservationWithPayment(infoPayment);
    return { data, status: 200 }
  }

  @Post('/payment')
  @ApiOperation({
    summary: 'Crear preferencia de pago',
    description: 'Genera una preferencia de pago (ej: MercadoPago) a partir de la información de la reserva.',
  })
  @ApiBody({ description: 'Información de la reserva para generar la preferencia de pago' })
  @ApiResponse({ status: 201, description: 'Preferencia de pago creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al crear la preferencia de pago.' })
  async createPreference(@Body() infoReservation) {
    return this.reservationsService.createPreference({ infoReservation });
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las reservas',
    description: 'Retorna la lista completa de reservas de todos los usuarios en el sistema.',
  })
  @ApiResponse({ status: 200, description: 'Lista de reservas obtenida exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al obtener las reservas.' })
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
  @ApiOperation({
    summary: 'Obtener reservas por usuario',
    description: 'Retorna todas las reservas asociadas a un usuario específico según su ID de cliente.',
  })
  @ApiParam({ name: 'client_id', description: 'ID del cliente cuyas reservas se desean obtener', example: 'abc123' })
  @ApiResponse({ status: 200, description: 'Reservas del usuario obtenidas exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al obtener las reservas del usuario.' })
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

  @Get('/professional/:professionalId')
  @ApiOperation({
    summary: 'Obtener reservas por profesional',
    description: 'Retorna todas las reservas asignadas a un profesional específico según su ID.',
  })
  @ApiParam({ name: 'professionalId', description: 'ID del profesional cuyas reservas se desean obtener', example: 'prof456' })
  @ApiResponse({ status: 200, description: 'Reservas del profesional obtenidas exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al obtener las reservas del profesional.' })
  async findAllByProfessional(@Param('professionalId') professionalId: string) {
    try {
      return {
        status: 200,
        data: await this.reservationsService.findAllByProfessional({ professionalId }),
        message: `SOLICITASTE TODAS LAS RESERVAS DEL PROFESIONAL CON EL ID: ${professionalId} EXITOSAMENTE`
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/availability')
  @ApiOperation({
    summary: 'Consultar disponibilidad',
    description: 'Retorna los horarios disponibles de un profesional para una fecha determinada.',
  })
  @ApiQuery({ name: 'date', description: 'Fecha a consultar en formato YYYY-MM-DD', example: '2026-03-15' })
  @ApiQuery({ name: 'professional_id', description: 'ID del profesional a consultar', example: 'prof456' })
  @ApiResponse({ status: 200, description: 'Disponibilidad obtenida exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al obtener la disponibilidad.' })
  async getAvailability(
    @Query('date') date: string,
    @Query('professional_id') professional_id: string,
  ) {
    return this.reservationsService.getAvailability(date, professional_id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una reserva por ID',
    description: 'Busca y retorna una reserva específica según su ID.',
  })
  @ApiParam({ name: 'id', description: 'ID de la reserva a obtener', example: 'res789' })
  @ApiResponse({ status: 200, description: 'Reserva encontrada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada.' })
  async findOne(@Param('id') reservationId: string) {
    return await this.reservationsService.findOne({ reservationId });
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una reserva',
    description: 'Elimina permanentemente una reserva del sistema según su ID.',
  })
  @ApiParam({ name: 'id', description: 'ID de la reserva a eliminar', example: 'res789' })
  @ApiResponse({ status: 200, description: 'Reserva eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada.' })
  async remove(@Param('id') id: string) {
    const data = await this.reservationsService.remove(id);
    return { data, status: 200 }
  }

  @Post('/by-users')
  @ApiOperation({
    summary: 'Obtener reservas por lista de usuarios',
    description: 'Recibe un arreglo de reservas y retorna la información agrupada por usuarios.',
  })
  @ApiBody({ description: 'Arreglo de objetos de tipo Reservation', type: [Object] })
  @ApiResponse({ status: 200, description: 'Reservas obtenidas exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al procesar la solicitud.' })
  async getByUsers(@Body() reservations: Reservation[]) {
    const data = await this.reservationsService.getByUsers(reservations);
    return { data }
  }
}