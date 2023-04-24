import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
import { response } from 'express';

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

	async accessIn(access_token: string) {
		const url = `https://api.intra.42.fr/v2/me`;
		const headersRequest = {
		  'Content-Type': 'application/json',
		  Authorization: `Bearer ${access_token}`,
		};
		const axios = require('axios');

		try {
			const response = await axios.get(url, { headers: headersRequest });
			return response.data.id;
		} catch (error) {
			console.error(error);
		};
	}

	async getAllUser(): Promise<User[]> {
		return await this.userRepository.find();
	}
}
