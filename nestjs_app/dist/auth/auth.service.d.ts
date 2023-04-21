import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: UserRepository);
    signUp(authCredentialDto: AuthCredentialDto): Promise<void>;
    signIn(authCredentialDto: AuthCredentialDto): Promise<string>;
    getAllUser(): Promise<User[]>;
}
