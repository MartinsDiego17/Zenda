import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) { }

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
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
