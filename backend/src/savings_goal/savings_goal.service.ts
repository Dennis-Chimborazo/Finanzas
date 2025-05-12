import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { CreateSavingsGoalDto } from './dto/create-savings_goal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SavingsGoal } from './entities/savings_goal.entity';
import { Repository } from 'typeorm';
import { AccountService } from 'src/account/account.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class SavingsGoalService {
  constructor(
    @InjectRepository(SavingsGoal)
    private goalRepository: Repository<SavingsGoal>,
    private readonly accountService: AccountService,
    private readonly emailService: EmailService,
  ) { }
  async findById(goalId: number) {
    const goalFinded = await this.goalRepository.findOne({
      where: { goal_id: goalId },
      relations: ['account'] // Here we specify that we want to load the 'account' relation
    });

    if (!goalFinded) throw new NotFoundException('enter an existing goal');
    return goalFinded;
  }

  async create(createSavingsGoalDto: CreateSavingsGoalDto, email: string) {
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
      // Schedule the reminder
      this.emailService.scheduleReminder(
        email,
        preparedGoal.goal_name
      );
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

  async generatedReportPdfInEmail(id: number, email: string) {

    const data = await this.findContributionsByAccountId(id);

    await this.emailService.sendContributionReport(email, data);
  }
  async findContributionsByAccountId(accountId: number) {
    const rawData = await this.goalRepository
      .createQueryBuilder('goal')
      .innerJoin('goal.contributions', 'contribution')
      .select([
        // Selecting the required fields with aliases to access them clearly from raw results
        'goal.goal_name AS goal_goal_name',
        'contribution.amount AS contribution_amount',
        'contribution.contribution_date AS contribution_contribution_date',
      ])
      .where('goal.account = :accountId', { accountId })
      .getRawMany();

    // Mapping raw result fields to match the DTO format expected by the PDF generator
    return rawData.map(item => ({
      goal_name: item.goal_goal_name,
      amount: parseFloat(item.contribution_amount),
      contribution_date: item.contribution_contribution_date,
    }));
  }
}
