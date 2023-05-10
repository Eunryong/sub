import { Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { TwoFactorLog } from './auth.twoFactorLog';
import UserRegisterType from './enum.user.register.type';
import { v4 } from 'uuid';

@Injectable()
export class AuthService {
	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: Repository<User>,
		private jwtService: JwtService,
		private userService: UserService
		// private mailerService: MailerService
	) {}
	private readonly logger = new Logger(AuthService.name);
	private twoFactorLogs: TwoFactorLog[] = [];
	private nodemailer = require("nodemailer");
	private mailService = this.nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'biisairo415@gmail.com',
			pass: 'sizgumtczgnjsiek'
		}
	});

// biisairo415@gmail.com
// sizgumtczgnjsiek

//////////////////////////////////////////
	findAll() {
		return this.twoFactorLogs;
	}

	removeAll() {
		this.twoFactorLogs = [];
	}

	removeDate() {
		this.deleteLogByDate();
	}

	async mailTest() {
		this.logger.debug('mail start');
		try {
			this.mailService.sendMail({
				from: 'BusPong <hello@world.com>',
				to: 'rlark1224@naver.com',
				subject: 'test',
				text: `ttttttest`
			})
			return 'success'
		} catch (error) {
			return 'fail'
		}
	}
//////////////////////////////////////////

	async FTApiUserMe(accessToken: string) {
		this.logger.debug('Get data from 42 API');
		const url = `https://api.intra.42.fr/v2/me`;
		const headersRequest = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${accessToken}`,
		};
		const axios = require('axios');

		try {
			const response = await axios.get(url, { headers: headersRequest });
			return {
				id: response.data.id,
				nick: response.data.login,
				email: response.data.email,
				profileUrl: response.data.image.link
			};
		} catch(error) {
			this.logger.debug('42 API fail');
			throw new InternalServerErrorException();
		}
	}

	async authUser(accessToken: string) {
		const userData = await this.FTApiUserMe(accessToken);
		const user = this.userRepository.create({
			id: userData.id,
			nick: this.uuid(),
			email: userData.email,
			profileUrl: userData.profileUrl,
		});

		const isUser = await this.userRepository.findOneBy({id: user.id});
		if (isUser) {
			this.logger.debug('User already exist');
			if (isUser.twoFactorAuth) {
				this.logger.debug('Two-factor auth');
				return {
					status: UserRegisterType.TWO_FACTOR_LOGIN,
					user: user
				};
			} else {
				return {
					status: UserRegisterType.PASS,
					user: user
				};
			}
		}

		try {
			await this.userRepository.save(user);
			this.logger.debug('New user saved');
			return {
				status: UserRegisterType.FIRST_LOGIN,
				user: user
			};
		} catch (error) {
			this.logger.debug('Save failed');
			throw new InternalServerErrorException();
		}
	}

	async signIn(id: number) {
		const user = await this.userRepository.findOneBy({id: id});
		if (!user)
			throw new UnauthorizedException();

		const payload = {
			id: user.id,
			nick: user.nick
		};
		return await this.jwtService.signAsync(payload);
	}

	async twoFactorPublish(id: number) {
		this.deleteLogByDate();

		const randNum: number = this.makeRandNum();
		this.twoFactorLogs.push({
			id: id,
			code: randNum,
			expire: Math.floor(new Date().getTime() / 1000) + 300
		});
		const user: User = await this.userRepository.findOneBy({id: id});
		if (!user)
			throw new UnauthorizedException();

		const email = user.email;
		try {
			this.mailService.sendMail({
				from: 'BusPong <hello@world.com>',
				to: email,
				subject: '인증 문자 전송',
				text: `${randNum}`
			})
		} catch (error) {
			return 'fail'
		}
		return randNum;
	}

	checkMail(id: number, code: number) {
		this.deleteLogByDate();

		const arg: TwoFactorLog = this.twoFactorLogs.find(x => x.id === id);
		if (!arg)
			return false;
		this.deleteLogById(arg.id);

		if (arg.expire < Math.floor(new Date().getTime() / 1000))
			return false;
		if (arg.code !== +code)
			return true;
		return true
	}

	async updateUser(id: number, nick: string, file: Express.Multer.File) {
		this.userService.updateNick(id, nick);
		this.userService.updateProfile(id, file.filename);
	}

	deleteLogByDate() {
		this.twoFactorLogs = this.twoFactorLogs.filter(x => x.expire > Math.floor(new Date().getTime() / 1000))
	}

	deleteLogById(id: number) {
		this.twoFactorLogs = this.twoFactorLogs.filter(x => x.id != id);
	}

	makeRandNum(): number {
		let randNum = Math.floor(Math.random() * 1000000);
		while (100000 > randNum || randNum > 999999)
			randNum = Math.floor(Math.random() * 1000000);
		return randNum;
	}

	uuid(): string {
		const tokens = v4().split('-')
		return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
	}
}
