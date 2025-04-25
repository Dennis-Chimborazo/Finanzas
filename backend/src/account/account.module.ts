import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { PeopleModule } from 'src/people/people.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports:[TypeOrmModule.forFeature([Account]),PeopleModule],
  exports:[AccountService]
})
export class AccountModule {}
