import { Body, Controller, Get, Logger, Param, Post, ValidationPipe } from '@nestjs/common';
import { DirectMessageService } from './direct-message.service';
import { NewMessageDto } from './dto/newMessage.dto';

@Controller('direct-message')
export class DirectMessageController {
	constructor(
		private directMessageService: DirectMessageService
	) {}
	private readonly logger = new Logger(DirectMessageController.name);

	@Get('from/:id')
	async findMessageByFrom(@Param('id') id: number) {
		return await this.directMessageService.findMessageByFrom(id);
	}

	@Get('to/:id')
	async findMessageByTo(@Param('id') id: number) {
		return await this.directMessageService.findMessageByTo(id);
	}

	@Post('create')
	async newMessage(@Body(ValidationPipe) newMessageDto: NewMessageDto) {
		return await this.directMessageService.newMessage(newMessageDto);
	}
}
