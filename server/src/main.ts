import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/response.interceptor';
import { HttpErrorFilter } from './common/exceptionFilters/HttpErrorFilter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: (origin, callback) => {
      const allowed = [
        'http://localhost:3000',
        'https://zenda-production.com',
      ];

      const isVercel = origin?.endsWith('.vercel.app');

      if (!origin || allowed.includes(origin) || isVercel) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Api - Zenda')
    .setDescription('Documentación de API de aplicación gestora de reserva de turnos.')
    .setVersion('1.0')
    .addTag('usuarios')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}
bootstrap(); 
