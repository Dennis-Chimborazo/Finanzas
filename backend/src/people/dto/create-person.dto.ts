import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreatePersonDto {
    @IsString()
    @IsNotEmpty()
    dni:string;
    @IsString()
    @IsNotEmpty()
    identificationType: string;
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    lastName: string;
    @IsDateString()
    @IsNotEmpty()
    DateOfBirth: Date;
    @IsString()
    @IsNotEmpty()
    addres: string;
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
    @IsString()
    @IsNotEmpty()
    profileFotoUrl: string;
}
