import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { PinoLogger } from 'nestjs-pino';
import { MediaQueryDto } from './dto/mediaQuery.dto';
import { MediaService } from './media.service';
import { SearchResponseDTO } from './dto/searchResponse.dto';
import { MediaResponseDto } from './dto/mediaResponse.dto';
import { LOG_MESSAGES } from '../logger/logMessages';

@Controller('media')
export class MediaController {
  private readonly logger: PinoLogger;

  constructor(
    private readonly mediaService: MediaService,
    logger: PinoLogger,
  ) {
    this.logger = logger;
  }

  @Get('health')
  @ApiOperation({ summary: 'Check Elasticsearch health status' })
  @ApiResponse({ status: 200, description: 'Elasticsearch is responsive' })
  @ApiResponse({ status: 500, description: 'Elasticsearch is unreachable' })
  async checkHealth() {
    try {
      const result = await this.mediaService.checkElasticsearchConnection();
      this.logger.info(LOG_MESSAGES.healthCheck.success, result);
      return result;
    } catch (error) {
      this.logger.error(LOG_MESSAGES.healthCheck.failure, error.stack);
      throw error;
    }
  }

  @Get('search')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @ApiOperation({ summary: 'Search media records' })
  @ApiResponse({
    status: 200,
    description: 'Successful search results',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Missing required parameters',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: [SearchResponseDTO<MediaResponseDto>] })
  async searchMedia(
    @Query() searchMediaDto: MediaQueryDto,
  ): Promise<SearchResponseDTO<MediaResponseDto>> {
    if (!searchMediaDto.queryString) {
      this.logger.warn(LOG_MESSAGES.search.missingQueryParam);
      throw new BadRequestException('Query parameter is required', {
        cause: new Error(),
        description: 'Query parameter is required',
      });
    }

    try {
      const result = await this.mediaService.searchMedia(searchMediaDto);
      this.logger.info(LOG_MESSAGES.search.success);
      return result;
    } catch (error) {
      this.logger.error(LOG_MESSAGES.search.failure, error.stack);
      throw error;
    }
  }
}
