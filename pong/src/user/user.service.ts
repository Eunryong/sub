import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/userCreate.dto';
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

	async findOneByUsername(username: string): Promise<User> {
		return await this.userRepository.findOneBy({username});
	}

	async findOneById(id: number): Promise<User> {
		return await this.userRepository.findOneBy({id});
	}

	async createUser(userCreateDto: UserCreateDto): Promise<void> {
		const {username, password} = userCreateDto;
		const user: User = this.userRepository.create({
			username: username,
			password: password
		});

		try {
			this.userRepository.save(user);
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	async removeAll(): Promise<void> {
		this.userRepository.clear();
	}
}
