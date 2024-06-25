import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { Public } from './api.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiGuard } from './api.guard';

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

  @UseGuards(ApiGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  async getProfile(@Request() req) {
    return this.apiServices.profile(req.user?.username);
  }
}
