import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import to from 'await-to-js';
import { City } from 'src/models/city/city.entity';
import { Repository } from 'typeorm';
import { CityQuery, CreateCityDto } from './city.dto';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/pagination';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const [errorExist, exist] = await to(
      this.cityRepository.findOne({
        where: {
          name: createCityDto.name,
        },
      }),
    );

    if (errorExist) {
      throw new InternalServerErrorException(errorExist);
    }

    if (exist) {
      throw new BadRequestException({
        message: 'La ciudad con ese nombre ya existe',
        code: HttpStatus.BAD_REQUEST.toString(),
      });
    }

    const city = this.cityRepository.create(createCityDto);

    const [errorCity, newCity] = await to(this.cityRepository.save(city));

    if (errorCity) {
      throw new InternalServerErrorException(errorCity);
    }

    return newCity;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<City>> {
    
    const queryBuilder = this.cityRepository.createQueryBuilder('city');

    queryBuilder
      .orderBy('city.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const total = await queryBuilder.getCount();
    const entities = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({ total, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
    
  }

  async findOne(cityQuery: CityQuery): Promise<City> {
    const queryBuilder = this.cityRepository
      .createQueryBuilder()
      .select('city')
      .from(City, 'city');

    if (cityQuery.id !== undefined) {
      queryBuilder.andWhere('city.id = :id', { id: cityQuery.id });
    }
    const city = await queryBuilder.getOne();

    if (!city) {
      throw new NotFoundException({
        message: 'No se encontró la ciudad asociada',
        code: HttpStatus.NOT_FOUND.toString(),
      });
    }

    return city;
  }

}
