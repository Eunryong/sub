import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board, BoardStatus } from './boards.entity';
import { BoardRepository } from './boards.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository, // private 를 사용하면 인자가 암묵적으로 프로퍼티로 선언됨
    ) {}

    async getAllBoards(user: User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', {userId : user.id});

        const boards = await query.getMany();
        return boards;
    }

    createBoard(
        createBoardDto: CreateBoardDto,
        user: User
        ): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(
        id: number,
        user: User
        ): Promise<Board> {
        const found: Board = await this.boardRepository.findOne({where: {id, userId: user.id}});

        if (!found) {
            throw new NotFoundException(`Cannot found board of ${id}`);
            // 404 not found 를 throw 하는 객체
        }

        return found;
    }

    // async await promise
    // async
    // - 비동기 함수 선언
    // await
    // - 비동기 내에서 동기 작업을 할 수 있는 키워드
    // - 비동기 함수 내에서 앞선 작업을 기다린다
    //     - db 작업에는 시간이 걸리게 되는데 제대로 데이터를 찾아온 뒤 작업이 진행 되어야 한다
    //     - 그런 이유로 db 에 접근하는 작업은 await 키워드를 적용해 동기로 진행시킨다
    // Promise
    // - 비동기 작업을 해 주는 객체
    // - 객체를 생성하고 콜백함수를 넣어서 실행하면 비동기 로 실행이 되며 성공, 실패의 결과를 확인하여 콜백함수를 실행시킨다
    // - async 함수의 return 값은 무조건 Promise 객체

    async deleteBoard(
        id : number,
        user: User
        ) : Promise<void> {
        const result = await this.boardRepository.delete({id, userId: user.id});
        if (result.affected == 0)
            throw new NotFoundException(`there is board id ${id}`);
        console.log(result)
    }

    // delete & remove
    // delete
    // - 아이템이 존재하면 지우고 존재하지 않으면 아무 작동도 하지 않음
    // remove
    // - 아이템이 존재하면 지우고 존재하지 않으면 404 not found 에러가 발생함
    // - 하나의 아이템을 지우기 위해 유무 확인 & 삭제 의 두번의 db 접근이 필요함

    async updateBoardStatus(
        id : number,
        status : BoardStatus,
        user: User
        ) : Promise<Board> {
        const board = await this.getBoardById(id, user);
        board.status = status;
        await board.save();
        return board;
    }
}
