import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import UserRegisterType from './enum.user.register.type';

@Injectable()
export class AuthService {
	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: Repository<User>,
		private jwtService: JwtService
	) {}
	private readonly logger = new Logger(AuthService.name);

	async FTApiUserMe(accessToken: string) {
		this.logger.log('Get data from 42 API');
		const url = `https://api.intra.42.fr/v2/me`;
		const headersRequest = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${accessToken}`,
		};
		const axios = require('axios');

		try {
			const response = await axios.get(url, { headers: headersRequest });
			return {
				id: response.data.id,
				nick: response.data.login,
				email: response.data.email,
				profileUrl: response.data.image.link
			};
		} catch(error) {
			console.log('42 API fail');
			throw new InternalServerErrorException();
		}
	}

	async loginUser(accessToken: string): Promise<UserRegisterType> {
		const userData = await this.FTApiUserMe(accessToken);
		const user = this.userRepository.create({
			id: userData.id,
			nick: userData.nick,
			email: userData.email,
			profileUrl: userData.profileUrl,
			twoFactorAuth: false
		});

		const isUser = await this.userRepository.findOneBy({id: user.id});
		if (isUser) {
			this.logger.log('User already exist');
			if (isUser.twoFactorAuth) {
				this.logger.log('Two-factor auth');
				return UserRegisterType.TWO_FACTOR_LOGIN;
			} else {
				return UserRegisterType.PASS;
			}
		}

		try {
			await this.userRepository.save(user);
			this.logger.log('New user saved');
			return UserRegisterType.FIRST_LOGIN;
		} catch (error) {
			this.logger.log('Save failed');
			throw new InternalServerErrorException();
		}
	}

	async signIn(id: number, nick: string) {
		const user = await this.userRepository.findOneBy({id: id});
		const payload = {
			user_id: user.id,
			user_nick: user.nick
		};
		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}
}
