import { ConflictException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { PeopleService } from 'src/people/people.service';
import { Person } from 'src/people/entities/person.entity';

@Injectable()
export class AccountService {

  

  async  findById(accountId: number) {
    const accountFinded=await this.accountRepository.findOneBy({accountId:accountId});
    if(!accountFinded) throw new NotFoundException('enter an existing account');
    return accountFinded;
  }
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private readonly peopleService: PeopleService,
  ) { }
  async createAccountBanc(createAccountDto: CreateAccountDto) {
    const peopleFound = await this.peopleService.findOneById(createAccountDto.personId);
    const accountfinded = await this.findAccountByTypeAndUserId(createAccountDto.accountType, peopleFound.personId);

    if (accountfinded) throw new ConflictException(`You already have an account of type: ${createAccountDto.accountType}`);
    // Create a new query runner for managing the transaction
    const querryRunner = await this.accountRepository.manager.connection.createQueryRunner();

    // Start the transaction
    await querryRunner.startTransaction();

    try {
      const preparedAccount = this.accountRepository.create({
        ...createAccountDto,
        personId: peopleFound,
      });

      const accountCreated = await querryRunner.manager.save(preparedAccount);

      if (!accountCreated) throw new NotFoundException('The account could not be created');

      let cero = "0";
      for (let i = 0; i < (accountCreated.accountId?.toString().length ?? 0); i++) {
        cero = cero + "0";
      }

      accountCreated.accountNumber = cero + accountCreated.accountId;
      await querryRunner.manager.update(Account, accountCreated.accountId, accountCreated);

      // Commit the transaction if everything goes well
      await querryRunner.commitTransaction();

      return accountCreated;
    } catch (error) {
      console.log(error);

      // Roll back the transaction in case of any error
      await querryRunner.rollbackTransaction();

      throw new ServiceUnavailableException('try again');
    } finally {
      // Release the query runner to free up resources
      await querryRunner.release();
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
