import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: Repository<User>
	) {}

	async findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async removeAll(): Promise<void> {
		this.userRepository.clear();
	}

	async loginUser(accessToken: string) {
		const url = `https://api.intra.42.fr/v2/me`;
		const headersRequest = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${accessToken}`,
		};
		const axios = require('axios');

		try {
			const response = await axios.get(url, { headers: headersRequest });
			const user = this.userRepository.create({
				id: response.data.id,
				nick: response.data.login,
				email: response.data.email,
				profileUrl: response.data.image.link,
				twoFactorAuth: false
			});

			const isUser = await this.userRepository.findOneBy({id: user.id});
			if (isUser) {
				if (isUser.twoFactorAuth) {
					console.log('two-factor authentication');
					return ;
				} else {
					console.log('Already exist');
					return ;
				}
			}

			try {
				await this.userRepository.save(user);
				console.log('user save success');
				return ;
			} catch (error) {
				console.log('user save fail');
				throw new InternalServerErrorException();
			}

		} catch (error) {
			console.log('42 API fail');
			throw new InternalServerErrorException();
		}
	}
}
