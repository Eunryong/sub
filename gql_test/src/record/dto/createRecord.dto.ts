import { Field, InputType, Int } from "@nestjs/graphql";
import { User } from "src/user/user.entity";

@InputType()
export class CreateRecordDto {
	@Field(() => User)
	leftId: User;

	@Field(() => User)
	rightId: User;

	@Field(() => Int)
	leftScore: number;

	@Field(() => Int)
	rightScore: number;
}
