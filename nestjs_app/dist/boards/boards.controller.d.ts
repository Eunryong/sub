import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';
export declare class BoardsController {
    private boardService;
    constructor(boardService: BoardsService);
    getAllBoard(): Promise<Board[]>;
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
    getBoardById(id: number): Promise<Board>;
    deleteBoard(id: number): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
