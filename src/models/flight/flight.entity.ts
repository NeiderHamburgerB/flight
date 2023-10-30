import { ApiProperty } from "@nestjs/swagger";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { City } from "../city/city.entity";

@Entity({ name: 'flights' })
export class Flights {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Ciudad de origen' })
    @ManyToOne(() => City, (city) => city.id)
    @JoinColumn({ name: 'origin_city_id' })
    origin_city?: City;

    @ApiProperty({ description: 'Id de la ciudad de origen' })
    @Column({ type: 'int' })
    origin_city_id: number;

    @ApiProperty({ description: 'Ciudad de destino' })
    @ManyToOne(() => City, (city) => city.id)
    @JoinColumn({ name: 'destination_city_id' })
    destination_city?: City;

    @ApiProperty({ description: 'Id de la ciudad de destino' })
    @Column({ type: 'int' })
    destination_city_id: number;

    @ApiProperty({ description: 'Aerolínea' })
    @Column({ type: 'varchar' })
    airline: string;

    @ApiProperty({ description: 'Clase de servicio' })
    @Column({ type: 'varchar' })
    service_class: string;

    @ApiProperty({ description: 'Tipo de avión' })
    @Column({ type: 'varchar' })
    aircraft_type: string;

    @ApiProperty({ description: 'Número de vuelo' })
    @Column({ type: 'varchar' })
    flight_number: string

    @ApiProperty({
        description: 'Fecha y Hora de inicio del vuelo de ida',
    })
    @Column({ type: 'timestamptz' })
    going_date_time: Date;

    @ApiProperty({
        description: 'Fecha y Hora de inicio del vuelo de vuelta',
    })
    @Column({ type: 'timestamptz', nullable: true })
    return_date_time: Date;

    @Column({ type: 'boolean' })
    round_trip: boolean

    @ApiProperty({
        description: 'Total pagado',
    })
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_amount: number;

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