import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRecordDto } from './dto/createRecord.dto';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
	constructor(
		private recordService: RecordService
	) {}

	@Get()
	async findAll() {
		return await this.recordService.findAll();
	}
///////////////////////////////////
	@Post('test')
	async create(@Body() createRecordDto: CreateRecordDto) {
		return await this.recordService.createRecord(createRecordDto);
	}
///////////////////////////////////

	@Get('player/:id')
	async findByUser(@Param('id') id: number) {
		return await this.recordService.findByUser(id);
	}

	@Get('winner/:id')
	async findByWinner(@Param('id') id: number) {
		return await this.recordService.findByWinner(id);
	}

	@Get('rate/:id')
	async winRate(@Param('id') id: number) {
		return await this.recordService.winRate(id);
	}
}
