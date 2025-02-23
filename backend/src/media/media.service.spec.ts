// jest.mock('@nestjs/elasticsearch', () => ({
//   ElasticsearchService: jest.fn().mockImplementation(() => ({
//     search: jest.fn(), // Mock the search function
//     ping: jest.fn(), // Mock the ping function
//   })),
// }));

import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PinoLogger } from 'nestjs-pino';
import { MediaQueryDto } from './dto/mediaQuery.dto';

describe('MediaService', () => {
  let service: MediaService;
  let elasticsearchService: ElasticsearchService;
  let logger: PinoLogger;

  const searchMediaDto: MediaQueryDto = {
    queryString: 'test',
    startDate: '2021-01-01',
    endDate: '2021-12-31',
    sortBy: 'asc',
    page: 0,
    size: 10,
  };

  const mockElastickSearchResult = {
    hits: {
      hits: [
        {
          _source: {
            bildnummer: '1',
            datum: '2021-01-01',
            suchtext: 'Test Image 1',
            fotografen: 'John Doe',
            hoehe: 100,
            breite: 200,
            db: 'TestDB',
          },
        },
      ],
      total: { value: 10 },
    },
  };

  const mockQueryResult = {
    totalRows: 10,
    pageSize: 10,
    pageNumber: 0,
    sortBy: 'asc',
    results: [
      {
        id: '1',
        title: 'Test Image 1',
        description: 'Test Image 1',
        photographer: 'John Doe',
        height: 100,
        width: 200,
        date: '2021-01-01',
        source: 'TestDB',
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: ElasticsearchService,
          useValue: {
            search: jest.fn(),
            ping: jest.fn(),
          },
        },
        {
          provide: PinoLogger,
          useValue: {
            warn: jest.fn(),
            info: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
    elasticsearchService =
      module.get<ElasticsearchService>(ElasticsearchService);
    logger = module.get<PinoLogger>(PinoLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkElasticsearchConnection', () => {
    it('should log success message if connection is successful', async () => {
      const checkElasticsearchConnectionSpy = jest
        .spyOn(elasticsearchService, 'ping')
        .mockResolvedValueOnce(true);

      await service.checkElasticsearchConnection();
      expect(checkElasticsearchConnectionSpy).toHaveBeenCalled();
    });

    it('should log error message if connection fails', async () => {
      const error = new Error('Connection failed');
      jest.spyOn(elasticsearchService, 'ping').mockRejectedValueOnce(error);
      const loggerSpy = jest.spyOn(service['logger'], 'error');

      await service.checkElasticsearchConnection();

      expect(loggerSpy).toHaveBeenCalledWith(
        'Elasticsearch connection failed:',
        error.message,
      );
    });
  });

  describe('searchMedia', () => {
    it('should return search results', async () => {
      elasticsearchService.search = jest
        .fn()
        .mockResolvedValue(mockElastickSearchResult);
      const result = await service.searchMedia(searchMediaDto);

      expect(result).toEqual(mockQueryResult);
    });
  });
});
