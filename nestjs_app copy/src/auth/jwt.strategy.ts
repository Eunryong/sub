import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable() // nest 의 어느곳에서도 사용 가능하도록 injectable 선언
export class JwtStrategy extends PassportStrategy(Strategy) {
	// PassportStrategy 를 extend
	constructor(
		private UserRepository: UserRepository
	) {
		super({
			secretOrKey: 'Secret1234',
			// jwt 의 secret key
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
			// 넘어오는 request 의 header 에서 jwt 를 찾도록 함
		})
	}

	// 위에서 유효한 토큰인지 체크가 되면 payload 에 있는 username 이 db 에 있는 유저인지 확인 후 유저객체를 반환
	async validate(payload) {
		const {username} = payload;
		const user: User = await this.UserRepository.findOneBy({username});

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
