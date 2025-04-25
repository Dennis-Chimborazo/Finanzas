import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { CreateSavingsGoalDto } from './dto/create-savings_goal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SavingsGoal } from './entities/savings_goal.entity';
import { Repository } from 'typeorm';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class SavingsGoalService {
  constructor(
    @InjectRepository(SavingsGoal)
    private goalRepository: Repository<SavingsGoal>,
    private readonly accountService: AccountService,
  ) { }
  async findById(goalId: number) {
    const goalFinded = await this.goalRepository.findOne({
        where: { goal_id: goalId },
        relations: ['account'] // Here we specify that we want to load the 'account' relation
    });

    if (!goalFinded) throw new NotFoundException('enter an existing goal');
    return goalFinded;
}

  async create(createSavingsGoalDto: CreateSavingsGoalDto) {
    // Create a query runner for managing the transaction manually
    const queryRunner = this.goalRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create the account using the same queryRunner to ensure it's part of the transaction
      const createAccount = await this.accountService.createAccountBanc(
        {
          accountType: 'meta',
          openingDate: new Date(),
          personId: createSavingsGoalDto.personId,
          status: 'active',
        },
        queryRunner // pass queryRunner for transactional context
      );

      // Prepare the savings goal with the newly created account
      const preparedGoal = this.goalRepository.create({
        ...createSavingsGoalDto,
        account: createAccount,
      });

      // Save the goal using the queryRunner's manager
      const goalCreated = await queryRunner.manager.save(SavingsGoal, preparedGoal);

      if (!goalCreated) throw new NotFoundException('Failed to create savings goal');

      // Commit transaction if all operations succeed
      await queryRunner.commitTransaction();
      return goalCreated;
    } catch (error) {
      // Roll back transaction if any operation fails
      await queryRunner.rollbackTransaction();
      throw new ServiceUnavailableException('Could not create goal. Please try again.');
    } finally {
      // Always release the query runner to free resources
      await queryRunner.release();
    }
  }

}
