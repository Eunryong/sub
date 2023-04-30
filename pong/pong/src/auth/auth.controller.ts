import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { FortyTwoAuthGuard } from './ft_auth.guard';

@Controller('auth')
export class AuthController {

	@UseGuards(FortyTwoAuthGuard)
	@Get()
	async login42(@Request() req) {
		return 'Success';
	}

}
