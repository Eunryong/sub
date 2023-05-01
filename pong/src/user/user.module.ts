import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    UserService
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}