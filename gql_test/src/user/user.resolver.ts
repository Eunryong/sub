import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => User, {name: 'user'})
	async getUser(@Args('id', { type: () => Int }) id: number) {
		return this.userService.findById(id);
	}

	@Query(() => [User], {name: 'users'})
	async getAllUser() {
		return this.userService.findAll();
	}

	@Mutation(() => User)
	async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
	  return await this.userService.createUser(createUserDto);
	}
}
