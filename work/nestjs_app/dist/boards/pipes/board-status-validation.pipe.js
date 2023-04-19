"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const boards_model_1 = require("../boards.model");
class BoardStatusValidationPipe {
    constructor() {
        this.StatusOptions = [
            boards_model_1.BoardStatus.PRIVATE,
            boards_model_1.BoardStatus.PUBLIC
        ];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value))
            throw new common_1.BadRequestException(`${value} is not in the status option`);
        return value;
    }
    isStatusValid(status) {
        return this.StatusOptions.indexOf(status) !== -1;
    }
}
exports.BoardStatusValidationPipe = BoardStatusValidationPipe;
//# sourceMappingURL=board-status-validation.pipe.js.map