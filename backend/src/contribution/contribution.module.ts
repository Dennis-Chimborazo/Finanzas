import { Module } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { ContributionController } from './contribution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contribution } from './entities/contribution.entity';

@Module({
  controllers: [ContributionController],
  providers: [ContributionService],
  imports:[TypeOrmModule.forFeature([Contribution])]
})
export class ContributionModule {}
