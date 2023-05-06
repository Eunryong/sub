import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {

	@Field(() => Int)
	id: number;

	@Field(() => String)
	nick: string;

	@Field(() => String)
	email: string;

	@Field(() => String)
	profileUrl: string;
}
