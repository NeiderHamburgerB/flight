import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CityParam, CreateCityDto } from './city.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import to from 'await-to-js';
import { PageOptionsDto } from 'src/common/pagination';

@ApiTags('Ciudades')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una ciudad'
  })
  async create(@Body() createCityDto: CreateCityDto) {
    const [error, response] = await to(this.cityService.create(createCityDto));

    if (error) {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las ciudades'
  })
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    const [error, response] = await to(
      this.cityService.findAll(pageOptionsDto),
    );

    if (error) {
      throw new BadRequestException(error);
    }

    return response;
  }

}
