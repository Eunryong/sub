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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const boards_entity_1 = require("./boards.entity");
const boards_repository_1 = require("./boards.repository");
const typeorm_1 = require("@nestjs/typeorm");
let BoardsService = class BoardsService {
    constructor(boardRepository) {
        this.boardRepository = boardRepository;
    }
    async getAllBoards() {
        return await this.boardRepository.find();
    }
    async createBoard(createBoardDto) {
        const { title, description } = createBoardDto;
        const board = this.boardRepository.create({
            title: title,
            description: description,
            status: boards_entity_1.BoardStatus.PUBLIC
        });
        await this.boardRepository.save(board);
        return board;
    }
    async getBoardById(id) {
        const found = await this.boardRepository.findOneBy({ id: id });
        if (!found) {
            throw new common_1.NotFoundException(`Cannot found board of ${id}`);
        }
        return found;
    }
    async deleteBoard(id) {
        const result = await this.boardRepository.delete(id);
        console.log(result);
    }
    async updateBoardStatus(id, status) {
        const board = await this.getBoardById(id);
        board.status = status;
        this.boardRepository.save(board);
        return board;
    }
};
BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(boards_entity_1.Board)),
    __metadata("design:paramtypes", [boards_repository_1.BoardRepository])
], BoardsService);
exports.BoardsService = BoardsService;
//# sourceMappingURL=boards.service.js.map