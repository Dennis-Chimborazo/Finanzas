import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateContributionDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(10)
    amount: number
    @IsString()
    @IsNotEmpty()
    contributionType: string;  // Type of contribution ('goal' or 'account').
    @IsOptional()
    @IsNumber()
    @Min(1)
    goalId?: number;
    @IsOptional()
    @IsNumber()
    @Min(1)
    accountId?: number;
}
