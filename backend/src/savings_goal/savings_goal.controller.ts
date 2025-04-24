import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavingsGoalService } from './savings_goal.service';
import { CreateSavingsGoalDto } from './dto/create-savings_goal.dto';
import { UpdateSavingsGoalDto } from './dto/update-savings_goal.dto';

@Controller('savings-goal')
export class SavingsGoalController {
  constructor(private readonly savingsGoalService: SavingsGoalService) {}

  @Post()
  create(@Body() createSavingsGoalDto: CreateSavingsGoalDto) {
    return this.savingsGoalService.create(createSavingsGoalDto);
  }

  @Get()
  findAll() {
    return this.savingsGoalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savingsGoalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSavingsGoalDto: UpdateSavingsGoalDto) {
    return this.savingsGoalService.update(+id, updateSavingsGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savingsGoalService.remove(+id);
  }
}
