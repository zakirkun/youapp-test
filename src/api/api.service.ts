import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/schemas/user.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { MessagesService } from 'src/messages/messages.service';
import { SendMessageDto } from 'src/messages/dto/send-message.dto';

@Injectable()
export class ApiService {
  constructor(
    private userServices: UsersService,
    private jwtServices: JwtService,
    private messageServices: MessagesService,
  ) {}

  async getMessage(username: string): Promise<any> {
    try {
      const user = await this.userServices.findOne(username);
      if (!user) return { errors: 'User does not exists.' };

      const message = await this.messageServices.getMessagesForUser(user.id);

      return {
        message: message,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async sendMessage(dto: SendMessageDto): Promise<any> {
    try {
      const sender = await this.userServices.findById(dto.senderId);
      if (!sender) return { error: 'Sender not registered.' };

      const receiver = await this.userServices.findById(dto.receiverId);
      if (!receiver) return { error: 'Receiver not registered.' };

      const sendMessage = await this.messageServices.sendMessage(dto);

      return { sendMessage };
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.userServices.findOne(loginDto.username);
      if (!user) return { errors: 'Username does not have an account.' };

      const passwordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!passwordValid) {
        return { errors: 'Invalid password.' };
      }

      const payload = { username: user.username };
      return {
        access_token: await this.jwtServices.signAsync(payload),
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async register(registerDto: RegisterDto): Promise<any> {
    try {
      const createUsers = await this.userServices.create({
        ...registerDto,
      });

      const payload = { username: createUsers.username };
      return {
        access_token: await this.jwtServices.signAsync(payload),
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async profile(username: string): Promise<Users> {
    return this.userServices.findOne(username);
  }

  async updateProfile(
    username: string,
    profileDto: UpdateProfileDto,
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      const avatarUrl = `/uploads/${file.filename}`;
      if (avatarUrl) {
        return this.userServices.update(username, {
          ...profileDto,
          avatar: avatarUrl,
        });
      }

      const getUsers = await this.userServices.findOne(username);
      if (!getUsers) return { error: 'Users not found.' };

      return this.userServices.update(username, { ...profileDto });
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async createProfile(
    username: string,
    profileDto: CreateProfileDto,
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      const avatarUrl = `/uploads/${file.filename}`;
      if (avatarUrl) {
        return this.userServices.update(username, {
          ...profileDto,
          avatar: avatarUrl,
        });
      }

      const getUsers = await this.userServices.findOne(username);
      if (!getUsers) return { error: 'Users not found.' };

      return this.userServices.update(username, { ...profileDto });
    } catch (error) {
      return {
        error: error,
      };
    }
  }
}
