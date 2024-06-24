import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  @Get('/')
  findAll(@Res() res: Response) {
    res.status(HttpStatus.CREATED).json({}).send();
  }
}
