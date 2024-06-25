import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { Users, userSchema } from 'src/users/schemas/user.schema';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Users.name, schema: userSchema }]),
    ClientsModule.register([
      {
        name: 'MESSAGING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'messages_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [NotificationGateway],
})
export class NotificationModule {}
