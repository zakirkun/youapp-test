import {
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
  IsArray,
  ArrayUnique,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsNotEmpty()
  file: Express.Multer.File;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'Test User',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  full_name?: string;

  @ApiProperty({
    description: 'The gender of the user',
    example: 'male',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  gender?: string;

  @ApiProperty({
    description: 'The birth date of the user',
    example: '1990-01-01',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birth_day?: Date;

  @ApiProperty({
    description: 'The height of the user in cm',
    example: 180,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  height?: number;

  @ApiProperty({
    description: 'The weight of the user in kg',
    example: 75,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  weight?: number;

  @ApiProperty({
    description: 'The interests of the user',
    example: ['coding', 'reading'],
    required: true,
  })
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  @IsOptional()
  interest?: string[];
}
