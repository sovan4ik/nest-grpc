import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { UsersGrpcClient } from './clients/users.client';
import { grpcClientOptions } from '~src/config/client/grpc-client-options';
import _CONFIG from '~src/config';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [ClientsModule.register([grpcClientOptions])],
  controllers: [UsersController],
  providers: [UsersGrpcClient, UsersService],
  exports: [UsersGrpcClient, UsersService],
})
export class UsersGrpcModule {}
