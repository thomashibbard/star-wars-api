import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { join, resolve } from 'path';
import { readdirSync } from 'fs';
const address = (process.env.ADDRESS = '0.0.0.0');
const port = process.env.PORT || 8080;
async function bootstrap() {
  console.log(`Bootrap ${address}@${port}`);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true,
    },
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  console.log('useStaticAssets', { __dirname });
  console.log('useStaticAssets readdir', {
    'readdir .': readdirSync('.'),
    'readdir assets': readdirSync('assets'),
    resolveDot: resolve('.', 'assets'),
    resolveDir: resolve(__dirname, 'assets'),
  });
  app.useStaticAssets({
    root: resolve('.', 'assets'),
    prefix: '/public',
  });
  await app.listen(port, address);
}
bootstrap();
