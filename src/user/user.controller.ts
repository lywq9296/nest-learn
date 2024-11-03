import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    // this.userService = new UserService()
  }

  @Get()
  getUsers(): any {
    const db = this.configService.get('db');
    console.log(`file: user.controller.ts `, db);

    return this.userService.getUsers();
  }

  @Post()
  addUser(): any {
    return this.userService.addUser();
  }
}
