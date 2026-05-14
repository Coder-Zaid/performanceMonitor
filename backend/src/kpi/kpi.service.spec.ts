import { Test, TestingModule } from '@nestjs/testing';
import { KpiService } from './kpi.service';
import { PrismaService } from '../prisma/prisma.service';

describe('KpiService', () => {
  let service: KpiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KpiService,
        {
          provide: PrismaService,
          useValue: {
            kpi: {
              findMany: jest.fn(),
            },
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<KpiService>(KpiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
