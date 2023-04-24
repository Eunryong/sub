import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardsController');
    constructor(private boardService: BoardsService) {}

    // 매개변수에 사용 되는 decorator
    // @Req Express 에서 사용 되는 request 객체를 가져옵니다
    // @Res Express 에서 사용 되는 response 객체를 가져옵니다
    // @Param 라우트 매개변수를 가져옵니다
    // @body http 요청 본문을 가져옵니다
    // @Query http 쿼리 매개변수를 가져옵니다
    // @Session 세션을 가져옵니다
    // @Headers http 요청 헤더를 가져옵니다


    @Post('/')
    @UsePipes(ValidationPipe)
    // pipe 를 사용하기 위해 pipe 사용을 선언 해 준다
    // handler level 에서 적용하기 위해 handler 에 선언 후
    // 유효성 체크를 위한 pipe 이므로 이미 만들어져서 사용하면 되는 pipe 중 validationpipe 를 사용 해 준다
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User
        ): Promise<Board> {
            this.logger.verbose(`User "${user.username}" creating a new board`);
            return this.boardService.createBoard(createBoardDto, user);
        }


    @Get('/')
    getAllBoard(
        @GetUser() user: User
    ): Promise<Board[]> {
        this.logger.verbose(`User "${user.username}" trying to get all boards`);
        return this.boardService.getAllBoards(user);
    }

    @Get('/:id')
    getBoardById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
        ): Promise<Board> {
        return this.boardService.getBoardById(id, user);
    }


    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
        @GetUser() user: User
        // 파라미터 level 의 pipe 사용
    ): Promise<Board> {
        return this.boardService.updateBoardStatus(id, status, user);
    }


    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id : number,
        @GetUser() user: User
        ) : Promise<void> {
        return this.boardService.deleteBoard(id, user);
    }
}