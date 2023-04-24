import { PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.entity";
export declare class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions: BoardStatus[];
    transform(value: string): string;
    private isStatusValid;
}
