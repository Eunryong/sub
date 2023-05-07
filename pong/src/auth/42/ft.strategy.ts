import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2"
import { AuthService } from "../auth.service";

@Injectable()
export class FTStrategy extends PassportStrategy(Strategy, 'ft') {
	constructor(
		private authService: AuthService,
		private configService: ConfigService
		) {
			super({
				clientID: configService.get<string>('CLIENTID'),
				clientSecret: configService.get<string>('CLIENTSECRET'),
				callbackURL: configService.get<string>('REDIRECTURI'),
				authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${
					configService.get<string>('CLIENTID')
				}&redirect_uri=${
					configService.get<string>('CLIENTSECRET')
				}&response_type=code`,
				tokenURL: 'https://api.intra.42.fr/oauth/token',
		});
	}

	async validate(accessToken) {
		try {
			return this.authService.authUser(accessToken);
			// return accessToken;
		} catch (error) {
			console.log(error);
		}
	}
}
