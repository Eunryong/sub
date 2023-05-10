import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();
		return this.validate(req);
	}

	validate(request: Request) {
		console.log('HEADER');
		console.log(request.headers);
		console.log('BODY');
		console.log(request.body);
		if (request.body['username'] == 'bug')
			return false
		return true;
	}
}
