import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class JwtGuard implements CanActivate {
	private readonly logger = new Logger(JwtGuard.name);
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext)
	: Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		let cookies = request.headers.cookie;
		if (!cookies)
			throw new UnauthorizedException();
		const token = this.extractJwt(cookies);
		if (!token)
		  throw new UnauthorizedException();

		this.logger.debug('JWT valid start');
		try {
			const payload = await this.jwtService.verifyAsync(
				token,
				{
					secret: process.env.JWT_SECRET
				}
			)
			request.user = payload;
			} catch(error) {
				this.logger.debug('JWT valid fail');
				throw new UnauthorizedException();
		}
		this.logger.debug('JWT valid success');
		return true;
	}

	extractJwt(cookie: string): string {
		const cookies = cookie.split('; ');
		for (let one of cookies) {
			const [key, value] = one.split('=');
			if (key === 'jwt')
				return value;
		}
		return null;
	}
}
