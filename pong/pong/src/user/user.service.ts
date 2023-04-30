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

	async findOne(id: number) {
		return await this.userRepository.findOneBy({id: id});
	}

	async createUser(userCreateDto: UserCreateDto) {
		const {username, password} = userCreateDto;
		const user: User = this.userRepository.create({
			username,
			password
		});

		try {
			this.userRepository.save(user);
		} catch (error) {
            if (error.code === '23505')
                throw new ConflictException('Existing username')
            else
                throw new InternalServerErrorException();
		}
	}

	async removeAll(): Promise<void> {
		this.userRepository.clear();
	}
}
