import { Module } from '@nestjs/common';
import { FlightModule } from './flight/flight.module';
import { CityModule } from './city/city.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [CityModule, FlightModule, ReservationModule ],
  controllers: [],
})
export class ApiModule { }