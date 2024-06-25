import { Test, TestingModule } from '@nestjs/testing';
import { ZodiacService } from './zodiac.service';

describe('ZodiacService', () => {
  let service: ZodiacService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZodiacService],
    }).compile();

    service = module.get<ZodiacService>(ZodiacService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
