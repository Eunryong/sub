import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserCreateDto } from 'src/user/dto/userCreate.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	// constructor(private authService: AuthService) {}

	// @HttpCode(HttpStatus.OK)
	// @Post('login')
	// signIn(@Body() signInDto: UserCreateDto) {
	// 	return this.authService.signIn(signInDto);
	// }
}
