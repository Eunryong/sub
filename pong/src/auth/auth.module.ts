import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { FTStrategy } from './42/ft.strategy';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [
		UserModule,
		HttpModule,
		DatabaseModule,
		PassportModule.register({defaultStrategy: "jwt"}),
		JwtModule.register({
			global: true,
			secret: 'Kkangji',
			signOptions: { expiresIn: '300s' },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserService,
		FTStrategy,
	],
	exports: [AuthService]
})
export class AuthModule {}
