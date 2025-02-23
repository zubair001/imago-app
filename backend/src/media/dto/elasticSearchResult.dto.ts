import { IsString, IsNumber } from 'class-validator';

export class ElasticSearchResultDto {
  @IsString()
  bildnummer: string;

  @IsString()
  datum: string;

  @IsString()
  suchtext: string;

  @IsString()
  fotografen: string;

  @IsNumber()
  hoehe: number;

  @IsNumber()
  breite: number;

  @IsString()
  db: string;
}
