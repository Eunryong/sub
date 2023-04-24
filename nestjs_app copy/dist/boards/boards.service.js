"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const boards_repository_1 = require("./boards.repository");
let BoardsService = class BoardsService {
    constructor(boardRepository) {
        this.boardRepository = boardRepository;
    }
    async getAllBoards(user) {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', { userId: user.id });
        const boards = await query.getMany();
        return boards;
    }
    createBoard(createBoardDto, user) {
        return this.boardRepository.createBoard(createBoardDto, user);
    }
    async getBoardById(id, user) {
        const found = await this.boardRepository.findOne({ where: { id, userId: user.id } });
        if (!found) {
            throw new common_1.NotFoundException(`Cannot found board of ${id}`);
        }
        return found;
    }
    async deleteBoard(id, user) {
        const result = await this.boardRepository.delete({ id, userId: user.id });
        if (result.affected == 0)
            throw new common_1.NotFoundException(`there is board id ${id}`);
        console.log(result);
    }
    async updateBoardStatus(id, status, user) {
        const board = await this.getBoardById(id, user);
        board.status = status;
        await board.save();
        return board;
    }
};
BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [boards_repository_1.BoardRepository])
], BoardsService);
exports.BoardsService = BoardsService;
//# sourceMappingURL=boards.service.js.map