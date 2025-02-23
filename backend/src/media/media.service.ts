import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as dotenv from 'dotenv';
import { PinoLogger } from 'nestjs-pino';
import { MediaQueryDto } from './dto/mediaQuery.dto';
import { SearchResponseDTO } from './dto/searchResponse.dto';
import { ElasticSearchResultDto } from './dto/elasticSearchResult.dto';
import { MediaResponseDto } from './dto/mediaResponse.dto';
import { LOG_MESSAGES } from 'src/logger/logMessages';
dotenv.config();

@Injectable()
export class MediaService {
  private readonly logger: PinoLogger;

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    logger: PinoLogger,
  ) {
    this.logger = logger;
  }

  async onModuleInit() {
    this.logger.info(LOG_MESSAGES.media.init);
    await this.checkElasticsearchConnection();
  }

  async checkElasticsearchConnection(): Promise<void> {
    try {
      await this.elasticsearchService.ping();
      this.logger.info(LOG_MESSAGES.elasticSearch.success);
    } catch (error) {
      this.logger.error(LOG_MESSAGES.elasticSearch.failure, error.message);
    }
  }

  async searchMedia(
    mediaQueryDto: MediaQueryDto,
  ): Promise<SearchResponseDTO<MediaResponseDto>> {
    this.logger.info(
      `Search Body ${mediaQueryDto.queryString}, 
      start date: ${mediaQueryDto.startDate} 
      end date: ${mediaQueryDto.endDate} 
      sortBy: ${mediaQueryDto.sortBy} 
      page: ${mediaQueryDto.page} size: ${mediaQueryDto.size}`,
    );

    try {
      const searchQueryResult = await this.executeSearchMedia(mediaQueryDto);
      const mediaResponse: MediaResponseDto[] =
        searchQueryResult.hits?.hits.map((hit) => {
          const source = hit._source as ElasticSearchResultDto;
          return {
            id: source.bildnummer,
            title: source.suchtext || 'No title',
            description: source.suchtext || 'No description',
            photographer: source.fotografen,
            height: source.hoehe,
            width: source.breite,
            date: source.datum,
            source: source.db,
          };
        }) || [];
      const totalRows = searchQueryResult.hits.total.value || 0;

      return {
        totalRows,
        pageSize: mediaQueryDto.size,
        pageNumber: mediaQueryDto.page,
        sortBy: mediaQueryDto.sortBy,
        results: mediaResponse,
      };
    } catch (error) {
      this.logger.error(LOG_MESSAGES.search.failure, error.message);
      throw new Error(
        'An error occurred while searching for media. Please try again later.',
      );
    }
  }

  private async executeSearchMedia(mediaQueryDto: MediaQueryDto): Promise<any> {
    try {
      const boolQuery: any = {
        must: [
          {
            multi_match: {
              query: mediaQueryDto.queryString,
              fields: ['suchtext^3', 'fotografen^2', 'db'],
              type: 'best_fields',
              fuzziness: 'AUTO',
            },
          },
          {
            prefix: {
              suchtext: {
                value: mediaQueryDto.queryString,
                boost: 3,
              },
            },
          },
        ],
        filter: [],
      };

      if (mediaQueryDto.startDate && mediaQueryDto.endDate) {
        boolQuery.filter.push({
          range: {
            datum: {
              gte: mediaQueryDto.startDate,
              lte: mediaQueryDto.endDate,
              format: 'yyyy-MM-dd',
            },
          },
        });
      }
      const queryResult =
        await this.elasticsearchService.search<ElasticSearchResultDto>({
          index: process.env.ELASTICSEARCH_INDEX,
          body: {
            query: {
              bool: boolQuery,
            },
            _source: [
              'bildnummer',
              'datum',
              'suchtext',
              'fotografen',
              'hoehe',
              'breite',
              'db',
            ],
            from: mediaQueryDto.page || 0,
            size: mediaQueryDto.size || 10,
            sort: [{ datum: { order: mediaQueryDto.sortBy } }],
          },
        });
      return queryResult;
    } catch (error) {
      this.logger.error(LOG_MESSAGES.search.failure, error.message);
      throw new Error(
        'An error occurred while searching for media. Please try again later.',
      );
    }
  }
}
