import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usesrModel: Model<Users>) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.usesrModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findOne(username: string): Promise<Users | undefined> {
    return this.usesrModel.findOne({ username });
  }

  async update(username: string, updateDto: UpdateUserDto): Promise<Users> {
    if (updateDto.password) {
      updateDto.password = await bcrypt.hash(updateDto.password, 10);
    }

    return this.usesrModel.findOneAndUpdate({ username }, updateDto, {
      new: true,
    });
  }
}
