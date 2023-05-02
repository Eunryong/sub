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

	@Delete()
	removeAll(): Promise<void> {
		return this.userService.removeAll();
	}
}
