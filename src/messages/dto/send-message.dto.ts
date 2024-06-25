import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
