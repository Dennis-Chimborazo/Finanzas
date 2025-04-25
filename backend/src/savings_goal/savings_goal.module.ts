import { Module } from '@nestjs/common';
import { SavingsGoalService } from './savings_goal.service';
import { SavingsGoalController } from './savings_goal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingsGoal } from './entities/savings_goal.entity';
import { AccountModule } from 'src/account/account.module';

@Module({
  controllers: [SavingsGoalController],
  providers: [SavingsGoalService],
  imports:[TypeOrmModule.forFeature([SavingsGoal]),AccountModule],
  exports:[SavingsGoalService]

})
export class SavingsGoalModule {}
