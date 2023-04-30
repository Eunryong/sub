import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private UserRepository;
    constructor(UserRepository: UserRepository);
    validate(payload: any): Promise<User>;
}
export {};
