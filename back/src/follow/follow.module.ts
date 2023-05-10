import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { followProviders } from './follow.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FollowController],
  providers: [
    FollowService,
    ...followProviders
  ],
})
export class FollowModule {}
