import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateRecordDto } from './dto/createRecord.dto';
import { Record } from './record.entity';

@Injectable()
export class RecordService {
	constructor(
		@Inject('RECORD_REPOSITORY')
		private recordRepository: Repository<Record>
		) {}

	async findAll() {
		return await this.recordRepository.find();
	}

	async findById(id: number) {
		return await this.recordRepository.findOneBy({id: id});
	}

	async findByWinner(id: number) {
		return await this.recordRepository.findOneBy({winner: id});
	}

	async createRecord(createRecordDto: CreateRecordDto) {
		const record = this.recordRepository.create({
			leftId: createRecordDto.leftId,
			rightId: createRecordDto.rightId,
			leftScore: createRecordDto.leftScore,
			rightScore: createRecordDto.rightScore,
			winner: createRecordDto.leftScore > createRecordDto.rightScore ? createRecordDto.leftId : createRecordDto.rightId
		});

		try {
			this.recordRepository.save(record);
			console.log('save');
		} catch (error) {
			throw new InternalServerErrorException('cant save');
		}
		return record;
	}
}
