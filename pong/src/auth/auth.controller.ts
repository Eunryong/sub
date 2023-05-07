import { Body, Controller, Get, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express'
import { FtAuthGuard } from './42/guard/ft.guard';
import { User } from 'src/decorator/user.decorator';
import UserRegisterType from './enum.user.register.type';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);
	constructor(private authService: AuthService) {}

	@UseGuards(JwtGuard)
	@Get('initialize')
	firstLogin(@User() user) {
		console.log(user);
		return 'first';
	}

	@UseGuards(JwtGuard)
	@Get('twoFactor')
	twoFactorAuth(@User() user) {
		console.log(user);
		this.authService.twoFactorPublish(user.id);
		return 'two';
	}

	@UseGuards(JwtGuard)
	@Post('twoFactor')
	checkMail(@User() user, @Body('code') code: number) {
		return this.authService.checkMail(user.id, code);
	}


	@UseGuards(JwtGuard)
	@Get('home')
	go(@User() user) {
		console.log(user);
		this.authService.twoFactorPublish(user.id);
		return 'go';
	}

	@UseGuards(FtAuthGuard)
	@Get('redirect')
	async login(@User() user, @Res() res: Response) {
		const jwt: string = await this.authService.signIn(user.id);
		res.cookie('jwt',jwt);

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
