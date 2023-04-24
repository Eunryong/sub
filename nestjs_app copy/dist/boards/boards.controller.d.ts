import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from 'src/auth/user.entity';
export declare class BoardsController {
    private boardService;
    private logger;
    constructor(boardService: BoardsService);
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
    getAllBoard(user: User): Promise<Board[]>;
    getBoardById(id: number, user: User): Promise<Board>;
    updateBoardStatus(id: number, status: BoardStatus, user: User): Promise<Board>;
    deleteBoard(id: number, user: User): Promise<void>;
}
