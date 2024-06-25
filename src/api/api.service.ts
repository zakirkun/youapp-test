import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const createUsers = await this.userServices.create({
        ...registerDto,
        password: hashedPassword,
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
}
