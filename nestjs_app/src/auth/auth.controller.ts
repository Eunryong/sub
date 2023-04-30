import { Body, Controller, Get, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

const clientId = 'u-s4t2ud-e9d4fc73c7e2f975fae9586944ab9e680484c97efb501e102073d5d899543355';
const clientSecret = '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';
const redirectUri = 'http://localhost:3000/auth/test';
const state = 'seeecret';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService){}

	// username 중복 확인
	// 1. findone 을 사용하여 username 이 있는지 확인 후 삽입
	// 2. db level 에서 중복이면 에러 반환 -> entity class 선언 시 unique 데코레이터 사용
	@Post('signup')
	signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
		return this.authService.signUp(authCredentialDto);
	}

	@Post('signin')
	signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
		return this.authService.signIn(authCredentialDto);
	}

	@Get()
	getAllUser() :Promise<User[]> {
		return this.authService.getAllUser();
	}

	@Post('authTest')
	@UseGuards(AuthGuard())
	authTest(@Req() req) {
		console.log(req.user);
	}

	@Get('test')
	async test(@Req() req: any, @Res() res: any) {
		const code = req.query['code'];
		// console.log(req);
		if (typeof code !== 'string') {
		res.send(`code is wrong.\ncode: ${code}`);
		}

		const params = new URLSearchParams();

		params.append('grant_type', 'authorization_code');
		params.append('client_id', clientId);
		params.append('client_secret', clientSecret);
		params.append('code', code);
		params.append('redirect_uri', redirectUri);
		params.append('state', state);

		const response = await fetch(`https://api.intra.42.fr/oauth/token?${params.toString()}`, {
			method: 'post',
		});

		const token = await response.json();
		console.log(token);
		let userId = this.authService.accessIn(token.access_token);
		userId.then((userId) => console.log(userId));
		// return 'done';
		res.send('done');
	}
}
