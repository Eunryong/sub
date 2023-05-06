import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { recordProviders } from './record.provider';
import { RecordResolver } from './record.resolver';
import { RecordService } from './record.service';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    RecordService,
    RecordResolver,
    ...recordProviders
  ]
})
export class RecordModule {}
