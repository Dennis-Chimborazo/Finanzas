import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSavingsGoalDto } from './dto/create-savings_goal.dto';
import { UpdateSavingsGoalDto } from './dto/update-savings_goal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SavingsGoal } from './entities/savings_goal.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class SavingsGoalService {
  constructor(
    @InjectRepository(SavingsGoal)
    private goalRepository:Repository<SavingsGoal>
  ){}
  async findById(goalId: number) {
    const goalFinded=await this.goalRepository.findOneBy({goal_id:goalId});
    if(!goalFinded) throw new NotFoundException('enter an existing goal');
    return goalFinded;
  }
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
