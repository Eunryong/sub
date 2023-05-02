import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { FtAuthGuard } from './42/guard/ft.guard';
import { User } from 'src/decorator/user.decorator';
import UserRegisterType from './enum.user.register.type';

@Controller('auth')
export class AuthController {

	@Get('initialize')
	first() {
		return 'first';
	}

	@Get('twoFactor')
	two() {
		return 'two';
	}

	@Get('home')
	go() {
		return 'go';
	}

	@UseGuards(FtAuthGuard)
	@Get('redirect')
	async login(@User() user, @Res() res: Response) {
		if (user === UserRegisterType.PASS) {
			res.redirect('http://localhost:3000/auth/home');
		} else if (user === UserRegisterType.TWO_FACTOR_LOGIN) {
			res.redirect('http://localhost:3000/auth/twoFactor');
		} else if (user === UserRegisterType.FIRST_LOGIN) {
			res.redirect('http://localhost:3000/auth/initialize');
		}
	}
}
