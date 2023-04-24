import { DataSource, Repository } from "typeorm";
import { Board, BoardStatus } from "./boards.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";

// repository
// 엔티티 객체와 함께 작동하며 엔티티의 찾기, 삽입, 업데이트, 삭제 (CRUD) 등을 처리
export class BoardRepository extends Repository<Board> { // 기존의 repository 를 받아온다

    constructor(@InjectRepository(Board) private dataSource: DataSource) {
        super(Board, dataSource.manager);
    }

    async createBoard(
        createBoardDto: CreateBoardDto,
        user: User
        ): Promise<Board> {
        const { title, description } = createBoardDto;

        const board: Board = this.create({ // entity 객체를 생성'만' 하게됨
            title: title,
            description: description,
            status: BoardStatus.PUBLIC,
            user: user
        });

        await this.save(board); // 생성한 객체를 repo 에 저장

        delete board.user;

        return board;
    }
}
