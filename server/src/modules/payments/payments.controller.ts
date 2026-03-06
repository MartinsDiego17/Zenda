import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('Payments')
@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post()
  @ApiOperation({
    summary: 'Crear un pago',
    description: 'Registra un nuevo pago en el sistema a partir de la información proporcionada.',
  })
  @ApiBody({ type: CreatePaymentDto, description: 'Datos necesarios para registrar el pago' })
  @ApiResponse({ status: 201, description: 'Pago creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o error al procesar el pago.' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }
}