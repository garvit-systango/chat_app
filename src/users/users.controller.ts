import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.usersService.createUser(email, password);
    return { message: 'User registered successfully', userId: user.id };
  }
}
