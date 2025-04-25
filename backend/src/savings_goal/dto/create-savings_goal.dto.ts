import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateSavingsGoalDto {
    @IsString()
    @IsNotEmpty()
    goal_name: string;
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;
    @IsNumber()
    @Min(250)           //The minimum value to create a goal will be $250.
    target_amount: number;
    @IsString()
    @IsNotEmpty()
    category: string;
    @IsDateString()
    start_date: Date;
    @IsDateString()
    end_date: Date;
    @IsNumber()
    @Min(1)
    personId: number;
}
