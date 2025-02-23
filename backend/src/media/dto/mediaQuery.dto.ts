import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MediaQueryDto {
  @ApiProperty({ description: 'Search query string', example: 'nature' })
  @IsNotEmpty({ message: 'Query string is required' })
  @IsString()
  queryString: string;

  @ApiPropertyOptional({
    description: 'Start date in ISO format (YYYY-MM-DD)',
    example: '2024-01-01',
  })
  @IsOptional()
  @IsDateString({}, { message: 'start date must be a valid format' })
  startDate?: string;

  @ApiPropertyOptional({
    description: 'End date in ISO format (YYYY-MM-DD)',
    example: '2024-12-31',
  })
  @IsOptional()
  @IsDateString({}, { message: 'end date must be a valid  format' })
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['asc', 'desc'],
    example: 'desc',
    default: 'desc',
  })
  @IsOptional()
  sortBy: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    default: 1,
  })
  @IsOptional()
  page: number;

  @ApiPropertyOptional({
    description: 'Number of results per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  size: number;
}
