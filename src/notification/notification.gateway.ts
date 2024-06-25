import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  notifyUser(userId: string, message: any) {
    this.server.to(userId).emit('message_received', message);
  }

  @EventPattern('message_received')
  async handleNewMessage(@Payload() data: any, @Ctx() context: RmqContext) {
    this.notifyUser(data?.receiverId, data.message);
    this.ack(context);
  }

  private ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
