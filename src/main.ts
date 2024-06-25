import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { json, urlencoded } from 'express';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  // Serve static files (for uploaded files)
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  // Body parser configuration
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('YOUAPP')
    .setDescription('YOUAPP Test api subsmission')
    .setVersion('1.0')
    .addTag('app')
    .setContact(
      'Muh Zakir Ramadhan',
      'https://github.com/zakirkun',
      'zakir@gnuweeb.org',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const configServices = app.get(ConfigService);
  const port = configServices.get<number>('PORT') || 3000;

  app.connectMicroservice({
    transport: Transport.RMQ,
    Options: {
      urls: [configServices.get<string>('AMPQ_URL')],
      queue: 'messaging_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(port);
}

bootstrap();
