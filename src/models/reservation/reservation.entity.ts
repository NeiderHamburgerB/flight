import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Flights } from '../flight/flight.entity';

@Entity({ name: 'reservations' })
export class Reservations {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ApiProperty({
        description: 'Email de la persona que reserva',
        example: 'neiderhamburger99@gmail.com',
    })
    @Column({ type: 'varchar', length: 100 })
    email: string;

    @ApiProperty({ description: 'Entidad vuelo a la que referencia la reserva' })
    @ManyToOne(() => Flights, (flights) => flights.id)
    @JoinColumn({ name: 'flight_id' })
    flight?: Flights;

    @ApiProperty({ description: 'Id del vuelo' })
    @Column({ type: 'varchar' })
    flight_id: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;

}
