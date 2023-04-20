import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board, BoardStatus } from './boards.entity';
import { BoardRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: BoardRepository,
    ){}

    async getAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;

        const board: Board = this.boardRepository.create({
            title: title,
            description: description,
            status: BoardStatus.PUBLIC
        });

        await this.boardRepository.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board> {
        const found: Board = await this.boardRepository.findOneBy({id: id});

        if (!found) {
            throw new NotFoundException(`Cannot found board of ${id}`);
            // 404 not found 를 throw 하는 객체
        }

        return found;
    }

    async deleteBoard(id : number) : Promise<void> {
        const result = await this.boardRepository.delete(id);
        console.log(result)
    }

    async updateBoardStatus(id : number, status : BoardStatus) : Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        this.boardRepository.save(board);
        return board;
    }
}
