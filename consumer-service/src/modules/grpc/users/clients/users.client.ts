import { USERS_SERVICE_NAME } from '@lib';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { firstValueFrom, timeout } from 'rxjs';
import { GRPC_CLIENT_TOKEN } from '../constants/users.constant';
import {
  GetFilteredUsersResponse,
  UsersGrpcService,
} from '../types/users.type';
import { ClientGrpc } from '@nestjs/microservices';
import _CONFIG from '~src/config';   


@Injectable()
export class UsersGrpcClient implements OnModuleInit {
  private service!: UsersGrpcService;

  constructor(
    @Inject(GRPC_CLIENT_TOKEN)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service = this.client.getService<UsersGrpcService>(USERS_SERVICE_NAME);
  }

  async getFilteredUsers(): Promise<GetFilteredUsersResponse> {
    return firstValueFrom(
      this.service
        .GetFilteredUsers({})
        .pipe(timeout(_CONFIG.app.grpc.timeoutMs)),
    );
  }
}
