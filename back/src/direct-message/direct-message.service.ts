import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DirectMessage } from './direct-message.entity';

@Injectable()
export class DirectMessageService {
	constructor(
		@Inject('DM_REPOSITORY')
		private DirectMessageRepository: Repository<DirectMessage>
	) {}

	async newMessage() {

	}
}
