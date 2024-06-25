import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, now } from 'mongoose';

@Schema({ timestamps: true })
export class Messages extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users', required: true })
  senderId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users', required: true })
  receiverId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ default: now() })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Messages);
