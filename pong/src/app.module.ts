import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { UserService } from './user/user.service';

@Module({
  imports: [
    // MulterModule.register({
    //   dest: '/app/profilePics'
    // }),
    UserModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
