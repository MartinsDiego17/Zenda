import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig } from 'mercadopago';

@Injectable()
export class MercadoPagoService {

  private readonly mercadoPago: MercadoPagoConfig;

  constructor(private configService: ConfigService) {
    this.mercadoPago = new MercadoPagoConfig({
      accessToken: this.configService.get<string>('config.mp_access_token') || "a"!,
    });
  }
  
  getMercadoPago() {
    return this.mercadoPago;
  }
}
