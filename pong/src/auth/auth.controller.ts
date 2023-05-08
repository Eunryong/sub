import { Body, Controller, Delete, Get, Logger, Param, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express'
import { FtAuthGuard } from './42/guard/ft.guard';
import { User } from 'src/decorator/user.decorator';
import UserRegisterType from './enum.user.register.type';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { nextTick } from 'process';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';

// userid 131666

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);
	constructor(private authService: AuthService) {}

//////////////////////////////////////////
	@Get()
	findAll() {
		return this.authService.findAll();
	}

	@Delete()
	removeAll() {
		return this.authService.removeAll();
	}

	@Get('test')
	removeDate() {
		return this.authService.removeDate();
	}

	@Get('mailTest')
	async mailTest() {
		return await this.authService.mailTest();
	}

	@Post('initializeTest')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: '/app/profilePics',
			}),
		}))
	uploadFileTest(@UploadedFile() file: Express.Multer.File) {
	  console.log(file);
	  this.authService.updateUser(131666, 'dongyoki', file);
	}

	@Get(':id')
	getImg(@Param('id') id, @Res() res: Response) {
		console.log(id);
		const url = `/app/profilePics/${id + '.png'}`;
		res.sendFile(url);
	}

	@Get('file')
	getFile(@Res() res: Response) {
	  const file = createReadStream(join(process.cwd(), '/app/profilePics/536dd61b49788d333ae76f5519427333.png'));
	  file.pipe(res);
	}
//////////////////////////////////////////

	@UseGuards(JwtGuard)
	@Get('initialize')
	firstLogin(@User() user) {
		console.log(user);
		return 'first';
	}

	@UseGuards(JwtGuard)
	@Post('initialize')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: '/app/profilePics',
			}),
		}))
	uploadFile(@User() user,
		@Body('nick') nick,
		@UploadedFile() file: Express.Multer.File) {
	//   console.log(file);
	//   console.log(nick);
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
		console.log(user.user.id);

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
