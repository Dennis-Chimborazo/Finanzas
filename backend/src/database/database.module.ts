import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Contribution } from 'src/contribution/entities/contribution.entity';
import { Person } from 'src/people/entities/person.entity';
import { SavingsGoal } from 'src/savings_goal/entities/savings_goal.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
            User, 
            Person,
            Account,
            SavingsGoal,
            Contribution 
        ],
        synchronize: true,
    }),
],
exports: [TypeOrmModule],
})
export class DatabaseModule {}
