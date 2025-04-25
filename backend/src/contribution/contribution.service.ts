import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { SavingsGoalService } from 'src/savings_goal/savings_goal.service';
import { AccountService } from 'src/account/account.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Contribution } from './entities/contribution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContributionService {
  constructor(
    @InjectRepository(Contribution)
    private contributionRepository: Repository<Contribution>,
    private readonly goalService: SavingsGoalService,
    private readonly accountService: AccountService
  ) { }

  async create(createContributionDto: CreateContributionDto) {
    this.validateContributionInput(createContributionDto);

    const preparedContribution = await this.prepareContribution(createContributionDto);

    if (!preparedContribution) {
      throw new BadRequestException('Failed to prepare the contribution');
    }
    return await this.contributionRepository.save(preparedContribution);
  }

  /**
   * Validates that either goalId or accountId is provided, but not both.
   */
  private validateContributionInput(dto: CreateContributionDto) {
    const { goalId, accountId } = dto;

    if (goalId && accountId) {
      throw new ConflictException('check the parameters sent');
    }

    if (!goalId && !accountId) {
      throw new BadRequestException('The location of the contribution must be specified');
    }
  }

  /**
   * Prepares the contribution entity depending on whether it's for a goal or account.
   * It ensures the account is updated with the contribution amount.
   * Returns the prepared contribution entity.
   */
  private async prepareContribution(dto: CreateContributionDto) {
    if (dto.goalId) {
      // Handle contribution for a specific goal
      const goal = await this.goalService.findById(dto.goalId);
      if (!goal) throw new NotFoundException('Goal not found');

      // Ensure the goal has an associated account
      if (!goal.account || !goal.account.accountId) {
        throw new BadRequestException('Goal does not have an associated account');
      }

      // Update the account balance with the contribution amount
      await this.accountService.updateAccountAmount(goal.account, dto.amount);

      // Return the contribution entity for saving
      return this.contributionRepository.create({
        ...dto,
        goalId: goal,
        accountId: null,
        contribution_date: new Date(),
      });
    }

    if (dto.accountId) {
      // Handle contribution for a specific account
      const account = await this.accountService.findById(dto.accountId);
      if (!account || !account.accountId) {
        throw new BadRequestException('Account not found or missing ID');
      }

      // Update the account balance with the contribution amount
      await this.accountService.updateAccountAmount(account, dto.amount);

      // Return the contribution entity for saving
      return this.contributionRepository.create({
        ...dto,
        goalId: null,
        accountId: account,
        contribution_date: new Date(),
      });
    }

    // If neither goalId nor accountId is provided, return null (but this should never happen due to validation)
    return null;
  }


}
