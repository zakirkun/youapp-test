import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { UsersModule } from 'src/users/users.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [UsersModule, MessagesModule],
  providers: [ApiService],
  controllers: [ApiController],
})
export class ApiModule {}
