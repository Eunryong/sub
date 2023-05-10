import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateRecordDto } from './dto/createRecord.dto';
import { Record } from './record.entity';

@Injectable()
export class RecordService {
	constructor(
		@Inject('RECORD_REPOSITORY')
		private recordRepository: Repository<Record>
	) {}
	private readonly logger = new Logger(RecordService.name);

	async findAll() {
		return await this.recordRepository.find();
	}

	async findByUser(id: number) {
		let player1 = await this.recordRepository.findBy({player1: id});
		let player2 = await this.recordRepository.findBy({player2: id});
		return player1.concat(player2);
	}

	async findByWinner(id: number) {
		return await this.recordRepository.findBy({winner: id});
	}

	async winRate(id: number) {
		let win: number = await this.recordRepository.countBy({winner: id});
		let game: number = await this.recordRepository.countBy({player1: id}) +
							await this.recordRepository.countBy({player2: id});
		return win/game;
	}

	async createRecord(createRecordDto: CreateRecordDto) {
		const {player1, player2, score1, score2} = createRecordDto;

		const record = this.recordRepository.create({
			player1,
			player2,
			score1,
			score2,
			winner: score1 > score2 ? player1 : player2,
			isRank: false
		});

		try {
			await this.recordRepository.save(record);
			this.logger.debug('Record save success');
		} catch (error) {
			this.logger.debug('Record save fail');
			throw new InternalServerErrorException();
		}
		return record;
	}
}
