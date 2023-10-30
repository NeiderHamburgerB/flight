import { Controller, Get, Post, Body, Param, BadRequestException, Query, HttpException, HttpStatus } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto, FilterFlightDto } from './flight.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import to from 'await-to-js';

@ApiTags('flight')
@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) { }
  
  @ApiOperation({
    summary: 'Crear un vuelo'
  })
  @Post()
  async create(@Body() createFlightDto: CreateFlightDto) {
    const [error, response] = await to(
      this.flightService.create(createFlightDto)
    );

    if (error) {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  @ApiOperation({
    summary: 'Obtener todos los vuelos'
  })
  @Get()
  async findAll(@Query() pageOptionsDto: FilterFlightDto) {
    const [error, response] = await to(
      this.flightService.findAll(pageOptionsDto),
    );

    if (error) {
      throw new BadRequestException(error);
    }

    return response;
  }

  @ApiOperation({
    summary: 'Obtener un vuelo'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const [error, response] = await to(
      this.flightService.findOne(id),
    );

    if (error) {
      throw new BadRequestException(error);
    }

    return response;
  }
}
