import { Controller, Get, Post, Body, Param, HttpStatus, HttpException, Query, BadRequestException } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './reservation.dto';
import { ApiTags } from '@nestjs/swagger';
import to from 'await-to-js';
import { PageOptionsDto } from 'src/common/pagination';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    const [error, response] = await to(
      this.reservationService.create(createReservationDto)
    );

    if (error) {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    const [error, response] = await to(
      this.reservationService.findAll(pageOptionsDto),
    );

    if (error) {
      throw new BadRequestException(error);
    }

    return response;
  }

}
