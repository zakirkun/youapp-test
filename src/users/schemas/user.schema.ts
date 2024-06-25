import { Injectable } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Messages } from 'src/messages/schemas/message.schema';
import { ZodiacService } from 'src/zodiac/zodiac.service';

@Injectable()
@Schema()
export class Users extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: false })
  full_name: string;

  @Prop({ required: false })
  gender: string;

  @Prop({ required: false })
  birth_day: Date;

  @Prop({ required: false })
  height: number;

  @Prop({ required: false })
  weight: number;

  @Prop({ type: [String], default: [] })
  interest: string[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Messages' }] }) // Reference to Message schema
  messages: Messages[];

  get zodiacSign(): string {
    const zodiacService = new ZodiacService();
    return zodiacService.getZodiacSign(this.birth_day);
  }
}

export const userSchema = SchemaFactory.createForClass(Users);
