import { IsNumber, IsString } from "class-validator";

export class NewMessageDto {
	@IsNumber()
	from: number;

	@IsNumber()
	to: number;

	@IsString()
	text: string;
}
