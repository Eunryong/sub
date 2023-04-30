import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

export class UserRepository extends Repository<User> {

    constructor(@InjectRepository(User) private dataSource: DataSource) {
        super(User, dataSource.manager);
    }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { username, password } = authCredentialDto;

        // hashing 을 위해 crypto 객채를 사용
        // 느리지만 더 강력한 보안에는 bcrypto 라이브러리 다운받아 사용
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user: User = this.create({
            username: username,
            password: hashedPassword
        });

        // unique 를 판단하는 부분에서 에러가 난 경우 기본적으로 500 error 를 발생
        // try catch 로 error 를 잡아 어떤 에러인지 확인 후 알맞은 에러 문구를 반환
        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505')
                throw new ConflictException('Existing username')
            else
                throw new InternalServerErrorException();
        }
    }

	async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
		const {username, password} = authCredentialDto;
		const user = await this.findOneBy({username: username});

		if (user && (await bcrypt.compare(password, user.password)))
			return username;
	}
}
