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

  async create(uid: string, email: string) {
    const user = this.userRepository.create({
      firebaseUid: uid,
      email: email,
      personId: null,
    })

    return this.userRepository.save(user);
  }

  async findOneUid(uid: string) {
    const user = await this.userRepository.findOne({ where: { firebaseUid: uid }, relations: ['personId'] });
    if (!user) throw new NotFoundException('ERROR: user not Found');
    return user;
  }

  async createUserData(createPersonDto: CreatePersonDto, uid: string) {
    const personCreated = await this.personService.create(createPersonDto);
    const user = await this.userRepository.findOneBy({ firebaseUid: uid });
    if (!user) throw new NotFoundException("The user could not be created")
    user.personId = personCreated;
    if (!user.userId) throw new NotFoundException("User ID is undefined");
    const userUpdate = await this.userRepository.update(user.userId, user);
    return userUpdate;
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
