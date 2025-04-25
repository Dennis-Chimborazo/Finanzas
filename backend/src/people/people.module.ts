import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';

@Module({
  controllers: [],
  providers: [PeopleService],
  imports:[TypeOrmModule.forFeature([Person])],
  exports:[PeopleService]
})
export class PeopleModule {}
