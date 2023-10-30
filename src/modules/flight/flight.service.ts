import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlightDto } from './flight.dto';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/pagination';
import { Flights } from 'src/models/flight/flight.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import to from 'await-to-js';

@Injectable()
export class FlightService {

  constructor(
    private dataSource: DataSource,
    @InjectRepository(Flights)
    private flightRepository: Repository<Flights>,) { }


  async create(createFlightDto: CreateFlightDto) {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create flight
      const [errorFlight, flight] = await to<Flights>(
        this.createFlight(
          queryRunner.manager,
          createFlightDto
        ),
      );

      if (errorFlight) {
        throw new BadRequestException(errorFlight);
      }

      await queryRunner.commitTransaction();

      return flight.id;

    } catch (error: Error | any) {

      await queryRunner.rollbackTransaction();
      // Internal Error
      throw error;

    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

  }

  async createFlight(
    entityManager: EntityManager,
    flightInfo: CreateFlightDto
  ) {

    //Creating flight
    const [errorExist, exists] = await to(
      entityManager.findOne(Flights, {
        where: {
          going_date_time: flightInfo.going_date_time,
          return_date_time: flightInfo.return_date_time,
          airline: flightInfo.airline
        },
        select: ['id'],
      }),
    );

    if (errorExist) {
      throw new BadRequestException(errorExist);
    }

    if (exists) {
      throw new BadRequestException({
        message: 'El vuelo que intenta registrar ya existe'
      });
    }

    const flight = entityManager.create<Flights>(Flights, flightInfo);

    const [errorFlight, newFlight] = await to(entityManager.save(Flights, flight));

    if (errorFlight) {
      throw new BadRequestException(errorFlight);
    }

    return newFlight;

  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Flights>> {

    const queryBuilder = this.flightRepository.createQueryBuilder('flights');

    queryBuilder
      .leftJoinAndSelect('flights.origin_city', 'city_origin')
      .leftJoinAndSelect('flights.destination_city', 'city_destination')
      .orderBy('flights.created_at', pageOptionsDto.order)

    if (pageOptionsDto.search) {
      const queryLike = `%${pageOptionsDto.search}%`.toLowerCase();
      queryBuilder
        .where('LOWER(city_origin.name) LIKE :queryLike', { queryLike })
        .orWhere('LOWER(city_destination.name) LIKE :queryLike', { queryLike })
        .orWhere('LOWER(flights.service_class) LIKE :queryLike', { queryLike })
        .orWhere('LOWER(flights.airline) LIKE :queryLike', {
          queryLike,
        });
    }

    queryBuilder
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const total = await queryBuilder.getCount();
    const entities = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({ total, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);

  }

  async findOne(id: string) {
    const [error, flight] = await to(
      this.flightRepository.findOne({
        where: { id },
        relations: ['origin_city', 'destination_city'],
      }),
    );
    if (error) {
      throw new BadRequestException(error);
    }

    if (!flight) {
      throw new NotFoundException({
        message: 'El vuelo no existe',
      });
    }
    return flight;

  }

  update(id: number, updateFlightDto: any) {
    return `This action updates a #${id} flight`;
  }

  remove(id: number) {
    return `This action removes a #${id} flight`;
  }
}
