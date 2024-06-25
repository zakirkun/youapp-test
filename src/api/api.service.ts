import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/schemas/user.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ApiService {
  constructor(
    private userServices: UsersService,
    private jwtServices: JwtService,
  ) {}

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
