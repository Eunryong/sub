import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMconfig } from './config/typeorm.config';

@Module({
  imports: [BoardsModule, TypeOrmModule.forRoot(typeORMconfig)]
})
export class AppModule {}
