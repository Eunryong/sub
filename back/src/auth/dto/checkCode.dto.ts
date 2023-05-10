import { IsNumber, Max, Min } from "class-validator";

export class CheckCodeDto {
	@IsNumber()
	@Min(100000)
	@Max(999999)
	code: number;
}
