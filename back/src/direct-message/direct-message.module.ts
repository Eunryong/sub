import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DirectMessageController } from './direct-message.controller';
import { directMessageProviders } from './direct-message.providers';
import { DirectMessageService } from './direct-message.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    DirectMessageService,
    ...directMessageProviders
  ],
  controllers: [DirectMessageController]
})
export class DirectMessageModule {}
