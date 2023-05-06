import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: Repository<User>
		) {}

	async findAll() {
		return await this.userRepository.find();
	}

	async findById(id: number) {
		return await this.userRepository.findOneBy({id: id});
	}

	async createUser(createUserDto: CreateUserDto) {
		const user = await this.userRepository.create({
			id: createUserDto.id,
			nick: createUserDto.nick,
			email: createUserDto.email,
			profileUrl: createUserDto.profileUrl,
		});

		await this.userRepository.save(user);
		return user;
	}
}
