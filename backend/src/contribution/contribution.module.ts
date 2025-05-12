import { Module } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { ContributionController } from './contribution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contribution } from './entities/contribution.entity';
import { AccountModule } from 'src/account/account.module';
import { SavingsGoalModule } from 'src/savings_goal/savings_goal.module';

@Module({
  controllers: [ContributionController],
  providers: [ContributionService],
  imports:[TypeOrmModule.forFeature([Contribution]),SavingsGoalModule,AccountModule]
})
export class ContributionModule {}
