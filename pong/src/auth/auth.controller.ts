import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { FtAuthGuard } from './42/guard/ft.guard';
import { Response } from 'express'

@Controller('auth')
export class AuthController {

	@Get()
	test() {
		return 'test';
	}

	@UseGuards(FtAuthGuard)
	@Get('redirect')
	async login(@Res() res: Response) {
		res.cookie('token', '546546546');
		res.redirect('http://localhost:3000/auth')
		return 'success';
	}
}
