import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RecordController } from './record.controller';
import { recordProviders } from './record.providers';
import { RecordService } from './record.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    RecordService,
    ...recordProviders
  ],
  controllers: [RecordController],
  exports: [RecordService]
})
export class RecordModule {}
