import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Messages } from './schemas/message.schema';
import { Model } from 'mongoose';
import { Users } from 'src/users/schemas/user.schema';
import { SendMessageDto } from './dto/send-message.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages.name) private readonly messageModel: Model<Messages>,
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
    @Inject('MESSAGING_SERVICE') private readonly client: ClientProxy,
  ) {}

  async sendMessage(messagesDto: SendMessageDto): Promise<Messages> {
    const { senderId, receiverId, message } = messagesDto;

    const createdMessage = await this.messageModel.create({
      senderId,
      receiverId,
      message,
    });

    // Update sender's and receiver's messages
    await this.userModel
      .findByIdAndUpdate(senderId, { $push: { messages: createdMessage._id } })
      .exec();
    await this.userModel
      .findByIdAndUpdate(receiverId, {
        $push: { messages: createdMessage._id },
      })
      .exec();

    // Send notification
    this.client.emit('message_received', {
      receiverId,
      message: createdMessage,
    });
    return createdMessage;
  }
  async getMessagesForUser(userId: string): Promise<Messages[]> {
    return this.messageModel
      .find({ $or: [{ senderId: userId }, { receiverId: userId }] })
      .exec();
  }
}
