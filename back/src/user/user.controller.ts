import { Body, Controller, Delete, Get, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { multerOptions } from 'src/file/multer.options';
import { User } from './user.entity';
import { UserService } from './user.service';
import { GetUser } from 'src/decorator/user.decorator';
import { UserNickDto } from './dto/user.nick.dto';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

////////////////////////////////////////////
	@Get()
	findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Delete()
	removeAll(): Promise<void> {
		return this.userService.removeAll();
	}
////////////////////////////////////////////

	@UseGuards(JwtGuard)
	@Post('updateProfile')
	@UseInterceptors(
		FileInterceptor('file', multerOptions))
	updateProfile(
		@GetUser()
		user,
		@UploadedFile() file: Express.Multer.File) {
	  this.userService.updateProfile(user.id, file.filename)
	}

	@UseGuards(JwtGuard)
	@Post('updateNick')
	updateNick(@GetUser() user,
		@Body() userNickDto: UserNickDto) {
		this.userService.updateNick(user.id, userNickDto.nick);
	}
}
