import { Module } from '@nestjs/common';
import { ZodiacService } from './zodiac.service';

@Module({
  exports: [ZodiacService],
  providers: [ZodiacService],
})
export class ZodiacModule {}
