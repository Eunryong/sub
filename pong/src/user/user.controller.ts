import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreate.dto';
import { User } from './user.entity';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Post()
	test(@Body() body) {
		console.log(body.name);
	}

	// @Get('username')
	// findOneByUsername(@Query('username') username: string): Promise<User> {
	// 	return this.userService.findOneByUsername(username);
	// }

	// @Get('id')
	// findOneById(@Query('id') id: number): Promise<User> {
	// 	return this.userService.findOneById(id);
	// }

	// @Post()
	// @UseGuards(UserGuard)
	// createUser(@Body() userCreateDto: UserCreateDto): Promise<void> {
	// 	return this.userService.createUser(userCreateDto);
	// }

	@Delete()
	removeAll(): Promise<void> {
		return this.userService.removeAll();
	}
}
