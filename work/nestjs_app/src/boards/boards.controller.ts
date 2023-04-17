import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService) {}

    @Get()
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Post()
    createBoard(
        @Body() createBoardDto: CreateBoardDto
        // Body : request 의 body 값을 가져온다
        // 인자로 key값을 넣으면 해당 key 의 value 를 받아온다
    ): Board {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get(':id')
    getBoardById(@Param('id') id: string): Board {
    // Param : url 값을 가져온다
    // 인자로 key 를 넣으면 해당 key 의 value 를 받아온다
        return this.boardService.getBoardById(id);
    }

    @Delete(':id')
    deleteBoard(@Param('id') id: string): void {
        this.boardService.deleteBoard(id);
    }

    @Patch(':id/status')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status') status: BoardStatus
    ): Board {
        return this.boardService.updateBoardStatus(id, status);
    }
}
