import { CreateBoardDto } from './dto/create-board.dto';
import { Board, BoardStatus } from './boards.entity';
import { BoardRepository } from './boards.repository';
export declare class BoardsService {
    private boardRepository;
    constructor(boardRepository: BoardRepository);
    getAllBoards(): Promise<Board[]>;
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
    getBoardById(id: number): Promise<Board>;
    deleteBoard(id: number): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
