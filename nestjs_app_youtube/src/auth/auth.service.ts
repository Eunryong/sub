import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private jwtService: JwtService // service 에서 인증 시 jwt 모듈이 필요함
	) {}

	signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
	return this.userRepository.signUp(authCredentialDto);
	}

	async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
		const username = await this.userRepository.signIn(authCredentialDto);
		if (!username) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const payload: JwtPayload = {username};
		const accessToken = await this.jwtService.sign(payload);

		return {accessToken};
	}

	async getAllUser(): Promise<User[]> {
		return await this.userRepository.find();
	}
}
