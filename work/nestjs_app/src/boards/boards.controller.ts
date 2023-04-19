import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService) {}

    @Get()
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    // pipe 를 사용하기 위해 pipe 사용을 선언 해 준다
    // handler level 에서 적용하기 위해 handler 에 선언 후
    // 유효성 체크를 위한 pipe 이므로 이미 만들어져서 사용하면 되는 pipe 중 validationpipe 를 사용 해 준다
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
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
        // 파라미터 level 의 pipe 사용
    ): Board {
        return this.boardService.updateBoardStatus(id, status);
    }
}
