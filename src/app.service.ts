import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      message: 'YouApp Api by Muh Zakir Ramadhan',
    };
  }
}
