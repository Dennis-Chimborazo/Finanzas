import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePersonDto } from 'src/people/dto/create-person.dto';
import { PeopleService } from 'src/people/people.service';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class UserService {
  async findAllAccounts(id: number) {
   return await this.accountService.findAllAccountsByIdPerson(id);
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly personService: PeopleService,
    private readonly accountService:AccountService,
  ) { }

  async create(uid: string, email: string, createPersonDTO: CreatePersonDto) {
    const personCreated=await this.personService.create(createPersonDTO);
    const user = this.userRepository.create({
      firebaseUid: uid,
      email: email,
      personId: personCreated,
    })

    return this.userRepository.save(user);
  }

  async findOneUid(uid: string) {
    const user = await this.userRepository.findOne({ where: { firebaseUid: uid }, relations: ['personId'] });
    if (!user) throw new NotFoundException('ERROR: user not Found');
    return user;
  }

  

}
