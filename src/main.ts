import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

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
  await app.listen(port);
}
bootstrap();
