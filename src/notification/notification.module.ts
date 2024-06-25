import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, userSchema } from 'src/users/schemas/user.schema';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: userSchema }]),
  ],
  providers: [NotificationGateway],
})
export class NotificationModule {}
