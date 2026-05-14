import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceEntryService } from './performance-entry.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

describe('PerformanceEntryService', () => {
  let service: PerformanceEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerformanceEntryService,
        {
          provide: PrismaService,
          useValue: {
            performanceEntry: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: NotificationService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PerformanceEntryService>(PerformanceEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
