import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';
import { SavingsGoalModule } from './savings_goal/savings_goal.module';
import { ContributionModule } from './contribution/contribution.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [PeopleModule, UserModule, AccountModule, DatabaseModule, SavingsGoalModule, ContributionModule,FirebaseModule, AuthModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }