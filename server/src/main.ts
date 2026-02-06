import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverless from 'serverless-http';
import express from 'express';

import type { VercelRequest, VercelResponse } from '@vercel/node';

let cachedHandler: any; // 👈 clave

async function bootstrap(): Promise<any> {
  if (!cachedHandler) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);

    const app = await NestFactory.create(AppModule, adapter);
    app.enableCors({
      origin: true,
      credentials: true,
    });

    await app.init();

    cachedHandler = serverless(expressApp);
  }

  return cachedHandler;
}

export const handler = async (req: VercelRequest, res: VercelResponse) => {
  const handler = await bootstrap();
  return handler(req, res);
};
