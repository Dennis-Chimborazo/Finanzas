import { ConflictException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { QueryRunner, Repository } from 'typeorm';
import { PeopleService } from 'src/people/people.service';
import { Person } from 'src/people/entities/person.entity';

@Injectable()
export class AccountService {



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


 
}
