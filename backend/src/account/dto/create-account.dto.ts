import { IsDateString, IsNotEmpty, IsNumber,  IsString, Min } from "class-validator";

export class CreateAccountDto {
    @IsString()
    @IsNotEmpty()
    accountType: string; //type-->scheduled, transactional savings
    @IsString()
    @IsNotEmpty()
    status: string;
    @IsDateString()
    @IsNotEmpty()
    openingDate: Date;
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    personId: number;
}
