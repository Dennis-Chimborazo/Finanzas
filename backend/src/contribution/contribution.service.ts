import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
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
   */
  private async prepareContribution(dto: CreateContributionDto) {
    if (dto.goalId) {
      const goal = await this.goalService.findById(dto.goalId);
      return this.contributionRepository.create({
        ...dto,
        goalId: goal,
        accountId: null,
        contribution_date: new Date()
      });
    }

    if (dto.accountId) {
      const account = await this.accountService.findById(dto.accountId);
      return this.contributionRepository.create({
        ...dto,
        goalId: null,
        accountId: account,
        contribution_date: new Date()
      });
    }
  }


}
