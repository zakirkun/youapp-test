import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { Public } from './api.decorator';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiGuard } from './api.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SendMessageDto } from 'src/messages/dto/send-message.dto';

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
  @Get('getProfile')
  @ApiBearerAuth('JWT-auth')
  async getProfile(@Request() req) {
    return this.apiServices.profile(req.user?.username);
  }

  @UseGuards(ApiGuard)
  @Patch('updateProfile')
  @ApiBearerAuth('JWT-auth')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async updateProfile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
    @Body() updateUsersDto: UpdateProfileDto,
  ) {
    return this.apiServices.updateProfile(
      req.user?.username,
      updateUsersDto,
      file,
    );
  }

  @UseGuards(ApiGuard)
  @Put('createProfile')
  @ApiBearerAuth('JWT-auth')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async createProfile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
    @Body() createDto: CreateProfileDto,
  ) {
    return this.apiServices.createProfile(req.user?.username, createDto, file);
  }

  @UseGuards(ApiGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('viewMessages')
  async getMessage(@Request() req) {
    return this.apiServices.getMessage(req.user?.username);
  }

  @UseGuards(ApiGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('sendMessage')
  async sendMessage(@Body() dto: SendMessageDto) {
    return this.apiServices.sendMessage(dto);
  }
}
