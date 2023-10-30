import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateReservationDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email:string

    @IsNotEmpty()
    @ApiProperty()
    flight_id:string
}
