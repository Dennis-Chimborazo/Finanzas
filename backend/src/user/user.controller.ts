import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAllAccounts(@Query('id', ParseIntPipe) id: number) {
    return this.userService.findAllAccounts(id);
  }

  
}
