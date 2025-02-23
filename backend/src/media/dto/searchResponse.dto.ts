import { ApiProperty } from '@nestjs/swagger';
import { MediaResponseDto } from './mediaResponse.dto';
import { Type } from 'class-transformer';

export class SearchResponseDTO<TData> {
  @ApiProperty({ example: 100, description: 'Total number of rows available' })
  totalRows: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  pageSize: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  pageNumber: number;

  @ApiProperty({ example: 'desc', description: 'Sorting order applied' })
  sortBy: string;

  @ApiProperty({
    isArray: true,
    type: () => MediaResponseDto,
    description: 'List of media results',
  })
  @Type(() => MediaResponseDto)
  results: TData[];
}
