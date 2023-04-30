import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMconfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMconfig), // typeORM 을 설정한 변수를 넣어 db 를 연결 해 줌
    BoardsModule, AuthModule, ApiModule
  ]
})
export class AppModule {}
