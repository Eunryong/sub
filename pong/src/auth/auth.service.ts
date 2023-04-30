import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCreateDto } from 'src/user/dto/userCreate.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	// constructor(
	// 	private userService: UserService,
	// 	private jwtService: JwtService
	// 	) {}

	// async signIn(signInDto: UserCreateDto) {
	// 	const {username, password} = signInDto;
	// 	const user = await this.userService.findOne(username);
	// 	if (user?.password !== password)
	// 		throw new UnauthorizedException();

	// 	const payload = {username: user.username, sub: user.id};
	// 	return {
	// 		access_token: await this.jwtService.signAsync(payload),
	// 	};
	// }
}
