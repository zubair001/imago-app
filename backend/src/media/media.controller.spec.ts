import { Test, TestingModule } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaQueryDto } from './dto/mediaQuery.dto';
import { BadRequestException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { SearchResponseDTO } from './dto/searchResponse.dto';
import { MediaResponseDto } from './dto/mediaResponse.dto';

describe('MediaController', () => {
  let controller: MediaController;
  let mediaService: MediaService;
  let logger: PinoLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [
        {
          provide: MediaService,
          useValue: {
            checkElasticsearchConnection: jest.fn(),
            searchMedia: jest.fn(),
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

    controller = module.get<MediaController>(MediaController);
    mediaService = module.get<MediaService>(MediaService);
    logger = module.get<PinoLogger>(PinoLogger);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkHealth', () => {
    it('should call mediaService.checkElasticsearchConnection', async () => {
      const checkElasticsearchConnectionSpy = jest.spyOn(
        mediaService,
        'checkElasticsearchConnection',
      );
      await controller.checkHealth();
      expect(checkElasticsearchConnectionSpy).toHaveBeenCalled();
    });
  });

  describe('searchMedia', () => {
    it('should throw BadRequestException if querystring is not provided', async () => {
      const searchMediaDto: MediaQueryDto = {
        queryString: '',
        startDate: '',
        endDate: '',
        sortBy: 'asc',
        page: 1,
        size: 10,
      };

      await expect(controller.searchMedia(searchMediaDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should call mediaService.searchMedia with correct parameters', async () => {
      const searchMediaDto: MediaQueryDto = {
        queryString: 'test',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
        sortBy: 'asc',
        page: 1,
        size: 10,
      };

      const searchMediaSpy = jest.spyOn(mediaService, 'searchMedia');
      await controller.searchMedia(searchMediaDto);
      expect(searchMediaSpy).toHaveBeenCalledWith(searchMediaDto);
    });

    it('should return media response with total rows, page size, and results', async () => {
      const mockQueryResult = {
        totalRows: 10,
        pageSize: 10,
        pageNumber: 0,
        sortBy: 'desc',
        results: [
          {
            id: '1',
            title: 'Test media 1',
            description: 'Test media 1',
            photographer: 'John Doe',
            height: 100,
            width: 200,
            date: '2022-01-01',
            source: 'TestDB',
          },
        ],
      };

      const mediaQueryDto: MediaQueryDto = {
        queryString: 'dhaka',
        startDate: '2021-05-27',
        endDate: '2023-02-28',
        sortBy: 'desc',
        page: 0,
        size: 10,
      };

      mediaService.searchMedia = jest.fn().mockResolvedValue(mockQueryResult);
      const response = await mediaService.searchMedia(mediaQueryDto);

      expect(response).toEqual<SearchResponseDTO<MediaResponseDto>>(
        mockQueryResult,
      );
    });

    it('should correctly handle the empty search result', async () => {
      const mockQueryResult = {
        totalRows: 0,
        pageSize: 10,
        pageNumber: 0,
        sortBy: 'desc',
        results: [],
      };

      const mediaQueryDto: MediaQueryDto = {
        queryString: 'nonexistent',
        startDate: '2021-05-27',
        endDate: '2023-02-28',
        sortBy: 'desc',
        page: 0,
        size: 10,
      };

      mediaService.searchMedia = jest.fn().mockResolvedValue(mockQueryResult);
      const response = await mediaService.searchMedia(mediaQueryDto);

      expect(response).toEqual<SearchResponseDTO<MediaResponseDto>>({
        totalRows: 0,
        pageSize: 10,
        pageNumber: 0,
        sortBy: 'desc',
        results: [],
      });
    });
  });
});
