import { Test, TestingModule } from '@nestjs/testing';
import { KpiController } from './kpi.controller';
import { KpiService } from './kpi.service';

describe('KpiController', () => {
  let controller: KpiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KpiController],
      providers: [
        {
          provide: KpiService,
          useValue: {
            findAll: jest.fn(),
            findForUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<KpiController>(KpiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
