import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import * as path from 'path';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @GrpcMethod('UserService', 'GetFilteredUsers')
  getFilteredUsers() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
    return this.service.getFilteredUsers(filePath);
  }
}
