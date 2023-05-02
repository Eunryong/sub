import { Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
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

	async authUser(accessToken: string) {
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
				return {
					status: UserRegisterType.TWO_FACTOR_LOGIN,
					user: user
				};
			} else {
				return {
					status: UserRegisterType.PASS,
					user: user
				};
			}
		}

		try {
			await this.userRepository.save(user);
			this.logger.log('New user saved');
			return {
				status: UserRegisterType.FIRST_LOGIN,
				user: user
			};
		} catch (error) {
			this.logger.log('Save failed');
			throw new InternalServerErrorException();
		}
	}

	async signIn(id: number, nick: string) {
		const user = await this.userRepository.findOneBy({id: id});
		if (!user)
			throw new UnauthorizedException();

		const payload = {
			user_id: user.id,
			user_nick: user.nick
		};
		return await this.jwtService.signAsync(payload);
	}
}
