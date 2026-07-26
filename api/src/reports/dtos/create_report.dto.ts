import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsLatitude,
  IsLongitude,
  Max,
  Min,
} from 'class-validator';

import {
  climateEventEnum,
  cropEnum,
  growthStageEnum,
  plantingMonthEnum,
} from '../../database/schema';

// Extract enum values from Drizzle enums
const crops = cropEnum.enumValues;
const climateEvents = climateEventEnum.enumValues;
const growthStages = growthStageEnum.enumValues;
const plantingMonths = plantingMonthEnum.enumValues;

export class CreateReportDto {
  @ApiProperty({
    example: 'Nyeri',
  })
  @IsString()
  county!: string;

  @ApiProperty({
    example: 'Tetu',
  })
  @IsString()
  subCounty!: string;

  @ApiPropertyOptional({
    example: 'Dedan Kimathi',
  })
  @IsOptional()
  @IsString()
  ward!: string;

  @ApiPropertyOptional({
    example: -0.417,
  })
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional({
    example: 36.951,
  })
  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @ApiProperty({
    enum: crops,
  })
  @IsEnum(crops)
  crop!: (typeof crops)[number];

  @ApiProperty({
    example: 2.5,
  })
  @IsNumber()
  farmSizeAcres!: number;

  @ApiProperty({
    enum: plantingMonths,
  })
  @IsEnum(plantingMonths)
  plantingMonth!: (typeof plantingMonths)[number];

  @ApiProperty({
    example: 2026,
  })
  @IsNumber()
  plantingYear!: number;

  @ApiProperty({
    enum: growthStages,
  })
  @IsEnum(growthStages)
  growthStage!: (typeof growthStages)[number];

  @ApiProperty({
    enum: climateEvents,
  })
  @IsEnum(climateEvents)
  climateEvent!: (typeof climateEvents)[number];

  @ApiProperty({
    example: '2026-07-26T00:00:00.000Z',
  })
  @IsString()
  reportDate!: string;

  @ApiProperty({
    example: 70,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  estimatedLossPercentage!: number;

  @ApiPropertyOptional({
  example: 35000,
  description: "Estimated financial loss in Kenyan Shillings",
})
@IsOptional()
@IsNumber()
@Min(0)

   estimatedFinancialLoss?: number;

  @ApiPropertyOptional({
    example:
      'Maize has dried due to delayed rains over the past month.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}