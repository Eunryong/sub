import { Body, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
    ) {}

    signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.signUp(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
        const {username, password} = authCredentialDto;
        const user = await this.userRepository.findOneBy({username: username});

        if (user && (await bcrypt.compare(password, user.password)))
            return 'logIn Success'
        else
            throw new UnauthorizedException('logIn Failed');
    }

    async getAllUser(): Promise<User[]> {
        return await this.userRepository.find();
    }
}
