import { IsAlphanumeric, IsString, MaxLength, MinLength } from "class-validator";

export class UserNickDto {
	@IsString()
	@IsAlphanumeric()
	@MinLength(4)
	@MaxLength(20)
	nick: string;
}
