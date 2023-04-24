import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty() // pipe 를 사용해 해당 인자가 제대로 되어있는 지 확인 한다
    title: string;

    @IsNotEmpty()
    description: string;
}