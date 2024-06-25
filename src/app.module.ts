import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ApiModule } from './api/api.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { ZodiacService } from './zodiac/zodiac.service';
import { ZodiacModule } from './zodiac/zodiac.module';

@Module({
  imports: [
    UsersModule,
    ApiModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGO_URI') ||
          'mongodb://localhost:27017/mongodb',
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'YouApp@2023!!',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRED') || '12h',
        },
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(__dirname, '..', '..', 'uploads'));
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
    ZodiacModule,
  ],
  controllers: [AppController],
  providers: [AppService, ZodiacService],
})
export class AppModule {}
