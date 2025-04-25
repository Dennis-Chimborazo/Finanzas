import { BadRequestException, ConflictException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { QueryRunner, Repository } from 'typeorm';
import { PeopleService } from 'src/people/people.service';
import { SavingsGoal } from 'src/savings_goal/entities/savings_goal.entity';
import { Contribution } from 'src/contribution/entities/contribution.entity';

@Injectable()
export class AccountService {
  


  async findAllAccountsByIdPerson(id: number) {
    try {
      // Create a query to get accounts with their related savings goals and optional contributions
      const accounts = await this.accountRepository
        .createQueryBuilder('a')
        .select([
          'sg.goal_id',
          'sg.goal_name',
          'sg.target_amount',
          'a.accountNumber',
          'a.accountType',
          'a.current_balance',
          'a.status',
        ])
        .innerJoin('a.savingsGoals', 'sg')  // Only include accounts that have savings goals
        .leftJoinAndSelect('sg.contributions', 'c')  // Optionally include contributions if they exist
        .where('a.personId = :id', { id })  // Filter accounts by person ID
        .getMany();

      // Format the result to only include needed fields from the first savings goal
      const result = accounts.map(account => ({
        goal_id: account.savingsGoals[0]?.goal_id,
        goal_name: account.savingsGoals[0]?.goal_name,
        accountNumber: account.accountNumber,
        accountType: account.accountType,
        current_balance: account.current_balance,
        status: account.status,
        avance:(account.current_balance/account.savingsGoals[0]?.target_amount)*100
      }));

      return result;
    } catch (error) {
      console.error(error);
      // Throw a service error if something goes wrong
      throw new ServiceUnavailableException('Try again later');
    }
  }

  async findById(accountId: number) {
    const accountFinded = await this.accountRepository.findOneBy({ accountId: accountId });
    if (!accountFinded) throw new NotFoundException('enter an existing account');
    return accountFinded;
  }
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private readonly peopleService: PeopleService,
  ) { }
  async createAccountBanc(createAccountDto: CreateAccountDto, queryRunner?: QueryRunner) {
    const peopleFound = await this.peopleService.findOneById(createAccountDto.personId);

    if (createAccountDto.accountType !== 'meta') {
      const existing = await this.findAccountByTypeAndUserId(createAccountDto.accountType, peopleFound.personId);
      if (existing) throw new ConflictException(`You already have an account of type: ${createAccountDto.accountType}`);
    }

    const shouldManageTransaction = !queryRunner;
    if (!queryRunner) {
      queryRunner = this.accountRepository.manager.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
    }

    try {
      const account = this.accountRepository.create({
        ...createAccountDto,
        personId: peopleFound,
      });

      const accountCreated = await queryRunner.manager.save(account);
      if (!accountCreated) throw new NotFoundException('Account could not be created');

      let cero = '0';
      for (let i = 0; i < (accountCreated.accountId?.toString().length ?? 0); i++) {
        cero = cero + '0';
      }

      accountCreated.accountNumber = cero + accountCreated.accountId;
      await queryRunner.manager.update(Account, accountCreated.accountId, accountCreated);

      if (shouldManageTransaction) {
        await queryRunner.commitTransaction();
      }

      return accountCreated;
    } catch (error) {
      console.error(error);
      if (shouldManageTransaction) {
        await queryRunner.rollbackTransaction();
      }
      throw new ServiceUnavailableException('Try again later');
    } finally {
      if (shouldManageTransaction) {
        await queryRunner.release();
      }
    }
  }

  /**
   * Checks if an account of the same type already exists for the given user.
   * This is used to prevent a user from having more than one account of the same type.
   * If an account is found, an exception will be thrown to avoid duplicate account creation.
   */
  private async findAccountByTypeAndUserId(accountType: string, personId: number) {
    return await this.accountRepository
      .createQueryBuilder('account')
      .where('account.accountType = :accountType', { accountType })
      .andWhere('account.person_id = :personId', { personId })
      .getOne();
  }

  async updateAccountAmount(account: Account, amount: number) {
    try {
      // If the account is not found, throw an exception
      if (!account) {
        throw new NotFoundException('Account not found');
      }
  
      // Ensure that both current_balance and amount are numbers
      const currentBalance: number = parseFloat(account.current_balance.toString());
      const newAmount: number = parseFloat(amount.toString());
  
      // If the current balance or the new amount is not a number, throw an error
      if (isNaN(currentBalance) || isNaN(newAmount)) {
        throw new BadRequestException('Invalid balance or amount');
      }
  
      // Calculate the new balance by adding the amount
      const balance: number = currentBalance + newAmount;
  
      // Optionally, round the balance to 2 decimal places for precision
      const roundedBalance: number = Math.round(balance * 100) / 100;
  
      // Update the account's balance
      account.current_balance = roundedBalance;
  
      // If accountId is undefined, throw an error
      if (account.accountId === undefined) {
        throw new NotFoundException('Account ID is undefined');
      }
  
      // Save the updated account with the new balance
      const updatedAccount = await this.accountRepository.update(account.accountId, account);
  
      // Return the updated account
      return updatedAccount;
  
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      throw new ServiceUnavailableException('Failed to update account balance');
    }
  }
  


}
