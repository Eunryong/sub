import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		PassportModule.register({defaultStrategy: 'jwt'}), // 인증을 도와주는 passport 모듈 임포트, 인증 방식은 jwt 로 설정
		// 사용자가 접속하면 서버는 jwt 를 만들어 사용자에게 보냄
		// jwt 는 클라이언트에게 쿠키로 저장됨
		// 사용자가 다른 요청을 보낼 때 header 에 jwt 를 포함하여 보냄
		// 서버에서 secret text 를 이용해 payload 안의 username 과 db 의 username 을 비교하여 인증을 확인함
		// 위의 과정을 쉽게 할 수 있도록 도와주는게 passport
		JwtModule.register({ // jwt 모듈 import
			secret: 'Secret1234', // 토큰을 생성할때 hashing 을 위해 사용하는 텍스트, 아무거나 넣기
			signOptions: { // option
				expiresIn: 60 * 60, // 토큰의 유효 시간, 초 단위로 나타냄 (60 * 60 은 한시간)
			}
		}),
		TypeOrmModule.forFeature([User])
	],
	controllers: [AuthController],
	providers: [AuthService, UserRepository, JwtStrategy],
	exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
