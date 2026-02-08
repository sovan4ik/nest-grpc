import { USERS_SERVICE_NAME, USERS_RPC_GET_FILTERED_USERS } from '@lib';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import * as path from 'path';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @GrpcMethod(USERS_SERVICE_NAME, USERS_RPC_GET_FILTERED_USERS)
  getFilteredUsers() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
    return this.service.getFilteredUsers(filePath);
  }
}
