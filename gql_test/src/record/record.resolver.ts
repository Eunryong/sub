import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { CreateRecordDto } from "./dto/createRecord.dto";
import { Record } from "./record.entity";
import { RecordService } from "./record.service";

@Resolver(() => Record)
export class RecordResolver {
	constructor(private readonly recordService: RecordService) {}

	@Query(() => [Record], {name: 'records'})
	async getAllRecord() {
		return this.recordService.findAll();
	}

	@Query(() => Record, {name: 'recordById'})
	async getRecordById(@Args('id', {type: () => Int}) id: number) {
		return this.recordService.findById(id);
	}

	@Query(() => Record, {name: 'recordByWinner'})
	async getRecordByWinner(@Args('winner', {type: () => User}) winner: User) {
		return this.recordService.findByWinner(winner);
	}

	@Mutation(() => Record)
	async createRecord(@Args('createRecordDto') createRecordDto: CreateRecordDto) {
		return await this.recordService.createRecord(createRecordDto);
	}
}
