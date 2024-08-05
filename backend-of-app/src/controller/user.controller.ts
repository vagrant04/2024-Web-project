import { Controller, Get, Post, Body, Query, Inject } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  @Inject()
  UserService: UserService;

  @Get('/')
  async home(): Promise<string> {
    return 'Login!';
  }

  @Post('/login')
  async login(
    @Body() body: { email?: string; password?: string },
    @Query() query: { email?: string; password?: string }
  ): Promise<string> {
    const email = body.email || query.email;
    const password = body.password || query.password;

    console.log('Received email:', email);
    console.log('Received password:', password);

    if (!email || !password) {
      return 'Email and password are required';
    }

    return this.UserService.handleLogin(email, password);
  }
}
