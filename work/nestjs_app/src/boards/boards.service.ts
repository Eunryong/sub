import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto): Board {
        const { title, description } = createBoardDto;

        const board: Board = {
            id: uuid(),
            title: title,
            description: description,
            status: BoardStatus.PUBLIC,
        }
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const found: Board = this.boards.find((board) => board.id === id);

        if (!found) {
            throw new NotFoundException(`Cannot found board of ${id}`);
            // 404 not found 를 throw 하는 객체
        }

        return found;
    }

    deleteBoard(id: string): void {
        const found: Board = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board: Board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
