import { Body, Controller, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { Public } from './api.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('api')
@ApiTags('api')
export class ApiController {
  constructor(private apiServices: ApiService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.apiServices.login(loginDto);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.apiServices.register(registerDto);
  }
}
