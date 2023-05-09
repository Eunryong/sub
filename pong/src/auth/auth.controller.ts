import { Body, Controller, Get, Logger, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express'
import { FtAuthGuard } from './42/guard/ft.guard';
import { User } from 'src/decorator/user.decorator';
import UserRegisterType from './enum.user.register.type';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/file/multer.options';

// userid 131666

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
	firstLogin(@User() user) {
		console.log(user);
		return 'first';
	}

	@UseGuards(JwtGuard)
	@Post('initialize')
	@UseInterceptors(
		FileInterceptor('file', multerOptions))
	uploadFile(@User() user,
		@Body('nick') nick,
		@UploadedFile() file: Express.Multer.File) {
	  this.authService.updateUser(user.id, nick, file);
	}

	@UseGuards(JwtGuard)
	@Get('twoFactor')
	twoFactorAuth(@User() user) {
		return this.authService.twoFactorPublish(user.id);
	}

	@UseGuards(JwtGuard)
	@Post('twoFactor')
	checkMail(@User() user, @Body('code') code: number) {
		return this.authService.checkMail(user.id, code);
	}


	@UseGuards(JwtGuard)
	@Get('home')
	async go(@User() user) {
		return 'go';
		// return await this.authService.twoFactorPublish(user.id);
	}

	@UseGuards(FtAuthGuard)
	@Get('redirect')
	async login(@User() user, @Res() res: Response) {
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
