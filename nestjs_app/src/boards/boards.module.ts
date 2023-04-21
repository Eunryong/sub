import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './boards.entity';
import { BoardRepository } from './boards.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Board])], // 생성한 repository 를 board module 에서 사용하기 위해 import
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
