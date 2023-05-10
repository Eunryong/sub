import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DirectMessage } from './direct-message.entity';
import { NewMessageDto } from './dto/newMessage.dto';

@Injectable()
export class DirectMessageService {
	constructor(
		@Inject('DM_REPOSITORY')
		private DirectMessageRepository: Repository<DirectMessage>
	) {}
	private readonly logger = new Logger(DirectMessageService.name);

	async findMessageByFrom(id: number) {
		return await this.DirectMessageRepository.findBy({from: id});
	}

	async findMessageByTo(id: number) {
		return await this.DirectMessageRepository.findBy({to: id});
	}

	async newMessage(newMessageDto: NewMessageDto) {
		const {from, to, text} = newMessageDto;
		const msg = this.DirectMessageRepository.create({
			from: from,
			to: to,
			text: text
		});

		try {
			await this.DirectMessageRepository.save(msg);
			this.logger.debug('Message save success');
		} catch (error) {
			this.logger.debug('Message save fail');
			throw new InternalServerErrorException();
		}
		return msg;
	}
}
