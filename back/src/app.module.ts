import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RecordModule } from './record/record.module';
import { DirectMessageModule } from './direct-message/direct-message.module';
import { FollowModule } from './follow/follow.module';

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
    RecordModule,
    DirectMessageModule,
    FollowModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
