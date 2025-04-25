import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { SavingsGoalService } from './savings_goal.service';
import { CreateSavingsGoalDto } from './dto/create-savings_goal.dto';
import { UpdateSavingsGoalDto } from './dto/update-savings_goal.dto';

@Controller('savings-goal')
export class SavingsGoalController {
  constructor(private readonly savingsGoalService: SavingsGoalService) {}

  @Post()
  create(@Body() createSavingsGoalDto: CreateSavingsGoalDto,@Request() req) {
    return this.savingsGoalService.create(createSavingsGoalDto,req.email);
  }

}
