import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const userSchema = SchemaFactory.createForClass(Users);
