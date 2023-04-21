import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialDto: AuthCredentialDto): Promise<void>;
    signIn(authCredentialDto: AuthCredentialDto): Promise<string>;
    getAllUser(): Promise<User[]>;
}
