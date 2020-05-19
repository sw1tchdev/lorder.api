import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class TaskUpdateDto {
  @ApiPropertyOptional()
  @MaxLength(140)
  @MinLength(3)
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  value?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsUrl()
  @IsOptional()
  source?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  status?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  performerId?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  typeId?: number;

  @ApiPropertyOptional({ isArray: true })
  @IsNumber(undefined, { each: true })
  @IsOptional()
  projectParts?: number[];
}
