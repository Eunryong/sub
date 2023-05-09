import { Body, Controller, Get, Logger, Post, Res, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { Response } from 'express'
import { FtAuthGuard } from './42/guard/ft.guard';
import { GetUser } from 'src/decorator/user.decorator';
import UserRegisterType from './enum.user.register.type';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/file/multer.options';
import { UserNickDto } from 'src/user/dto/user.nick.dto';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);
	constructor(private authService: AuthService) {}

	@Get()
	oauth(@Res() res: Response) {
		res.redirect(`https://api.intra.42.fr/oauth/authorize?client_id=${process.env.CLIENTID}&redirect_uri=${process.env.REDIRECTURI}&response_type=code`);
	}

	@UseGuards(JwtGuard)
	@Get('initialize')
	firstLogin(@GetUser() user) {
		console.log(user);
		return 'first';
	}

	@UseGuards(JwtGuard)
	@Post('initialize')
	@UseInterceptors(
		FileInterceptor('file', multerOptions))
	uploadFile(
		@GetUser()
		user,
		@Body(ValidationPipe) userNickDto: UserNickDto,
		@UploadedFile() file: Express.Multer.File) {
			console.log(userNickDto.nick);
	  this.authService.updateUser(user.id, userNickDto.nick, file);
	}

	@UseGuards(JwtGuard)
	@Get('twoFactor')
	twoFactorAuth(@GetUser() user) {
		return this.authService.twoFactorPublish(user.id);
	}

	@UseGuards(JwtGuard)
	@Post('twoFactor')
	checkMail(@GetUser() user, @Body('code') code: number) {
		return this.authService.checkMail(user.id, code);
	}


	@UseGuards(JwtGuard)
	@Get('home')
	async go(@GetUser() user) {
		return 'go';
		// return await this.authService.twoFactorPublish(user.id);
	}

	@UseGuards(FtAuthGuard)
	@Get('redirect')
	async login(@GetUser() user, @Res() res: Response) {
		const jwt: string = await this.authService.signIn(user.user.id);
		res.cookie('jwt',jwt);
		console.log(jwt);

		if (user.status === UserRegisterType.PASS) {
			this.logger.debug('HOME');
			res.redirect('http://localhost:3000/auth/home');
		} else if (user.status === UserRegisterType.TWO_FACTOR_LOGIN) {
			this.logger.debug('TWO_FACTOR');
			res.redirect('http://localhost:3000/auth/twoFactor');
		} else if (user.status === UserRegisterType.FIRST_LOGIN) {
			this.logger.debug('FIRST_LOGIN');
			res.redirect('http://localhost:3000/auth/initialize');
		}
	}
}
