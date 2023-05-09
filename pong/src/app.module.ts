import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: '/public'
    }),
    UserModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    FileModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
