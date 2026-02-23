import { IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { type Reservation } from '../types/reservations';

export class CreateReservationDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Object)
  reservation: Reservation;

  @IsNumber()
  deposit_amount: number;
}
