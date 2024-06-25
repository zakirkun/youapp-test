import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema, Messages } from './schemas/message.schema';
import { Users, userSchema } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Messages.name,
        schema: MessageSchema,
      },
      {
        name: Users.name,
        schema: userSchema,
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'MESSAGING_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('AMPQ_URL')],
            queue: 'messaging_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
