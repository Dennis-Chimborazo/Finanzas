import { Injectable } from '@nestjs/common';
import { CreateSavingsGoalDto } from './dto/create-savings_goal.dto';
import { UpdateSavingsGoalDto } from './dto/update-savings_goal.dto';

@Injectable()
export class SavingsGoalService {
  create(createSavingsGoalDto: CreateSavingsGoalDto) {
    return 'This action adds a new savingsGoal';
  }

  findAll() {
    return `This action returns all savingsGoal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} savingsGoal`;
  }

  update(id: number, updateSavingsGoalDto: UpdateSavingsGoalDto) {
    return `This action updates a #${id} savingsGoal`;
  }

  remove(id: number) {
    return `This action removes a #${id} savingsGoal`;
  }
}
