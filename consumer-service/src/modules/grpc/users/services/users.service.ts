import { Injectable } from '@nestjs/common';
import { UsersGrpcClient } from '~src/modules/grpc/users/clients/users.client';

@Injectable()
export class UsersService {
  constructor(private readonly usersGrpcClient: UsersGrpcClient) {}

  async getFilteredUsers() {
    return await this.usersGrpcClient.getFilteredUsers();
  }
}
