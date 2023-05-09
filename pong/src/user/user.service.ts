import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
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

	async findOne(id: number): Promise<User> {
		return await this.userRepository.findOneBy({id: id});
	}

	async removeAll(): Promise<void> {
		this.userRepository.clear();
	}

	async updateNick(id: number, nick: string) {
		let user = await this.findOne(id);
		user.nick = nick;
		try {
			await this.userRepository.save(user);
		} catch (error) {
			throw new ConflictException();
		}
	} // 동일닉네임 미리 체크

	async updateProfile(id: number, profileName: string) {
		let user = await this.findOne(id);

		const oriPic = user.profileUrl.replace('http://localhost:3000/', '/public/');

		user.profileUrl= 'http://localhost:3000/' + profileName;
		try {
			await this.userRepository.save(user);
		} catch (error) {
			throw new ConflictException();
		}
		console.log(oriPic);
		if (existsSync(oriPic)) {
			unlinkSync(oriPic);
		}
	}
}
