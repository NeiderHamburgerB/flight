import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { Flights } from 'src/models/flight/flight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flights]),
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
