import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.entity";

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: string): string {
        value = value.toUpperCase();
        if (!this.isStatusValid(value))
            throw new BadRequestException(`${value} is not in the status option`);

        return value;
    }

    private isStatusValid(status: any): boolean {
        return this.StatusOptions.indexOf(status) !== -1;
    }
}
