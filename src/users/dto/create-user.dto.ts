import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsDate,
  IsNumber,
  IsArray,
  ArrayUnique,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  birth_day?: Date;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiProperty()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  @IsOptional()
  interest?: string[];
}
