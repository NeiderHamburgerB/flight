import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { PageOptionsDto } from 'src/common/pagination';

class CreateFlightDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  origin_city_id: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  destination_city_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  airline: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  service_class: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  aircraft_type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  flight_number: string;

  @IsDateString()
  @ApiProperty()
  going_date_time: Date;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  return_date_time?: Date;

  @IsBoolean()
  @ApiProperty()
  round_trip: boolean;

  @ApiProperty()
  @IsNotEmpty()
  total_amount:number
}

class FilterFlightDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  search?: string;

}

export { CreateFlightDto, FilterFlightDto }