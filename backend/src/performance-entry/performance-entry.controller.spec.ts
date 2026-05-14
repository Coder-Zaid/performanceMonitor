import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceEntryController } from './performance-entry.controller';
import { PerformanceEntryService } from './performance-entry.service';

describe('PerformanceEntryController', () => {
  let controller: PerformanceEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformanceEntryController],
      providers: [
        {
          provide: PerformanceEntryService,
          useValue: {
            submit: jest.fn(),
            getSummary: jest.fn(),
            findPending: jest.fn(),
            reviewEntry: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PerformanceEntryController>(PerformanceEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
