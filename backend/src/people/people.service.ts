import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleService {
  async findOneById(personId: number) {
    const personfinded=await this.personRepository.findOneBy({personId:personId});
    if(!personfinded)throw new NotFoundException("no find the person");
    return personfinded;
  }
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>
  ) { }
  async create(createPersonDto: CreatePersonDto) {
    const findedUser=await this.findOneByDni(createPersonDto.dni);
    if(findedUser) throw new ConflictException('this person is already registered')
    const preparedUser = await this.personRepository.create(createPersonDto);
    const personCreated = await this.personRepository.save(preparedUser);
    if (!personCreated) throw new NotFoundException("The people could not be created");
    return personCreated;
  }

  findAll() {
    return `This action returns all people`;
  }

  findOneByDni(dni: string) {
    return this.personRepository.findOneBy({dni:dni});
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
