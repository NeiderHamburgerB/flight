import { Module } from '@nestjs/common';
import { FlightModule } from './flight/flight.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [CityModule, FlightModule ],
  controllers: [],
})
export class ApiModule { }