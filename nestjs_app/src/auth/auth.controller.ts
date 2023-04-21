import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { Auth } from 'typeorm';

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
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<string> {
        return this.authService.signIn(authCredentialDto);
    }

    @Get()
    getAllUser() :Promise<User[]> {
        return this.authService.getAllUser();
    }
}
