import { DataSource, Repository } from "typeorm";
import { Board } from "./boards.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { User } from "src/auth/user.entity";
export declare class BoardRepository extends Repository<Board> {
    private dataSource;
    constructor(dataSource: DataSource);
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
}
