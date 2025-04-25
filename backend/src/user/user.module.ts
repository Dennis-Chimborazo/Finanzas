import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PeopleModule } from 'src/people/people.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[TypeOrmModule.forFeature([User]),PeopleModule,AccountModule],
  exports:[UserService]
})
export class UserModule {}
