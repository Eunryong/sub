import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { FTStrategy } from './42/ft.strategy';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: 'Kkangji',
			signOptions: { expiresIn: '60s' },
		}),
		UserModule,
		HttpModule,
		DatabaseModule
	],
	controllers: [AuthController],
	providers: [AuthService, FTStrategy],
	exports: [AuthService]
})
export class AuthModule {}
