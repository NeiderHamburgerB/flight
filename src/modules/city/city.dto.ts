import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export interface CityQuery {
  id?: number;
  name?: string;
}

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  code?: string;

}

export class CityParam {
  cityId: number;
}

export class UpdateCityDto extends PartialType(CreateCityDto) {}
