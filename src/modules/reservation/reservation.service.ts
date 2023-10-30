import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './reservation.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservations } from 'src/models/reservation/reservation.entity';
import to from 'await-to-js';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/pagination';

@Injectable()
export class ReservationService {

  constructor(
    private dataSource: DataSource,
    @InjectRepository(Reservations)
    private reservationRepository: Repository<Reservations>,) { }

  async create(createReservationDto:CreateReservationDto ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create flight
      const [errorFlight, flight] = await to<Reservations>(
        this.createReservation(
          queryRunner.manager,
          createReservationDto
        ),
      );

      if (errorFlight) {
        throw new BadRequestException(errorFlight);
      }

      await queryRunner.commitTransaction();

      return flight;

    } catch (error: Error | any) {

      await queryRunner.rollbackTransaction();
      // Internal Error
      throw error;

    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

  }


  async createReservation(
    entityManager: EntityManager,
    reservationInfo: CreateReservationDto
  ) {
    
    const reservation = entityManager.create<Reservations>(Reservations, reservationInfo);

    const [errorReservation, newReservation] = await to(entityManager.save(Reservations, reservation));

    if (errorReservation) {
      throw new BadRequestException(errorReservation);
    }

    return newReservation;

  }


  async findAll(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.reservationRepository.createQueryBuilder('reservations');

    queryBuilder
      .leftJoinAndSelect('reservations.flight', 'flight')
      .leftJoinAndSelect('flight.origin_city', 'origin_city')
      .leftJoinAndSelect('flight.destination_city', 'destination_city')
      .orderBy('reservations.created_at', pageOptionsDto.order)

    queryBuilder
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const total = await queryBuilder.getCount();
    const entities = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({ total, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }


}
