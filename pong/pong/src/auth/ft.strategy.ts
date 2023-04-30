import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";

const CLIENTID = 'u-s4t2ud-e9d4fc73c7e2f975fae9586944ab9e680484c97efb501e102073d5d899543355';
const CLIENTSECRET = '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';
const REDIRECTURI = 'http://localhost:3000/user/redirect'

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, 'ft') {
	constructor() {
		super({
			authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${CLIENTID}&redirect_uri=${CLIENTSECRET}&response_type=code`,
			tokenURL: 'https://api.intra.42.fr/oauth/token',
			clientID: CLIENTID,
			clientSecret: CLIENTSECRET,
			callbackURL: REDIRECTURI,
		});
	}

	async validate(accessToken: string, refreshToken: string) {
		try {
			console.log('accessToken: ', accessToken);
			console.log('refreshToken: ', refreshToken);
			return accessToken;
		} catch (error) {
			console.log(error);
		}
	}
}
