import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RecordModule } from './record/record.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [UserModule, RecordModule],
      autoSchemaFile: 'schema.gql'
    }),
    RecordModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
