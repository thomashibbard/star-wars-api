import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
const address = (process.env.ADDRESS = '0.0.0.0');
const port = process.env.PORT || 5000;
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
  app.useStaticAssets({
    root: join(__dirname, '..', 'src/assets'),
    prefix: '/public',
  });
  await app.listen(port, address);
}
bootstrap();
