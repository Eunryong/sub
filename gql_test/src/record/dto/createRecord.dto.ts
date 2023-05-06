import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateRecordDto {
	@Field(() => Int)
	leftId: number;

	@Field(() => Int)
	rightId: number;

	@Field(() => Int)
	leftScore: number;

	@Field(() => Int)
	rightScore: number;
}
