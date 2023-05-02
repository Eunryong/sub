import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
// import { Request } from 'express';


@Injectable()
export class JwtGuard implements CanActivate {
	private readonly logger = new Logger(JwtGuard.name);
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext)
	: Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const [name, token] = request.headers.cookie?.split('=');
		if (!token) {
		  throw new UnauthorizedException();
		}

		this.logger.log('JWT valid start');
		try {
			const payload = await this.jwtService.verifyAsync(
				token,
				{
					secret: 'Kkangji'
				}
			)
			request.user = payload;
			} catch(error) {
				this.logger.log('JWT valid fail');
				throw new UnauthorizedException();
		}
		this.logger.log('JWT valid success');
		return true;
	}
}
