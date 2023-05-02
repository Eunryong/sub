import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2"
import { AuthService } from "../auth.service";

const clientId = 'u-s4t2ud-e9d4fc73c7e2f975fae9586944ab9e680484c97efb501e102073d5d899543355';
const clientSecret = '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';
const redirectUri = 'http://localhost:3000/auth/redirect';
const state = 'seeecret';

@Injectable()
export class FTStrategy extends PassportStrategy(Strategy, 'ft') {
	constructor(private authService: AuthService) {
		super({
			authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${clientSecret}&response_type=code`,
			tokenURL: 'https://api.intra.42.fr/oauth/token',
			clientID: clientId,
			clientSecret: clientSecret,
			callbackURL: redirectUri,
		});
	}

	async validate(accessToken) {
		try {
			return this.authService.loginUser(accessToken);
			// return accessToken;
		} catch (error) {
			console.log(error);
		}
	}
}
