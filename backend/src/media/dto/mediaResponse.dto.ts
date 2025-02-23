import { ApiProperty } from '@nestjs/swagger';

export class MediaResponseDto {
  @ApiProperty({ example: '12345', description: 'Unique media ID' })
  id: string;

  @ApiProperty({
    example: 'Beautiful Landscape',
    description: 'Title of the media',
  })
  title: string;

  @ApiProperty({
    example: 'A high-resolution image of nature.',
    description: 'Description of the media',
  })
  description: string;

  @ApiProperty({ example: 'John Doe', description: 'Photographer name' })
  photographer: string;

  @ApiProperty({ example: 1080, description: 'Height of the media in pixels' })
  height: number;

  @ApiProperty({ example: 1920, description: 'Width of the media in pixels' })
  width: number;

  @ApiProperty({
    example: '2024-01-01T12:00:00Z',
    description: 'Date when the media was taken (ISO 8601 format)',
  })
  date: string;

  @ApiProperty({ example: 'IMAGO', description: 'Source database or provider' })
  source: string;
}
