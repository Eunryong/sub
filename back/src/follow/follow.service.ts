import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateFollowDto } from './dto/createFollow.dto';
import { Follow } from './follow.entity';

@Injectable()
export class FollowService {
	constructor(
		@Inject('FOLLOW_REPOSITORY')
		private followRepository: Repository<Follow>
	) {}
	private readonly logger = new Logger(FollowService.name);

	async createFollow(createFollowDto: CreateFollowDto) {
		const {follower, follow} =createFollowDto;
		const relation = this.followRepository.create({
			follower: follower,
			follow: follow
		});

		try {
			await this.followRepository.save(relation);
			this.logger.debug('Relation save success');
		} catch (error) {
			this.logger.debug('Relation save fail');
			throw new InternalServerErrorException();
		}
		return relation;
	}

	async deleteFollow(createFollowDto: CreateFollowDto) {
		const {follower, follow} =createFollowDto;
		await this.followRepository.delete({
			follower: follower,
			follow: follow
		});
	}

	async findMyFollower(id: number) {
		return await this.followRepository.findBy({follow: id});
	}

	async findMyFollow(id: number) {
		return await this.followRepository.findBy({follower: id});
	}
}
