import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePersonDto } from 'src/people/dto/create-person.dto';
import { PeopleService } from 'src/people/people.service';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly personService: PeopleService,
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

  

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
