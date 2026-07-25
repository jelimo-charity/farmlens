import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterReportsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  county?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subCounty?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  crop?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  climateEvent?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  growthStage?: string;

  @ApiPropertyOptional({
    enum: [
      'reportDate',
      'estimatedLossPercentage',
      'farmSizeAcres',
      'county',
    ],
  })
  @IsOptional()
  @IsIn([
    'reportDate',
    'estimatedLossPercentage',
    'farmSizeAcres',
    'county',
  ])
  sortBy?:
    | 'reportDate'
    | 'estimatedLossPercentage'
    | 'farmSizeAcres'
    | 'county';

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}