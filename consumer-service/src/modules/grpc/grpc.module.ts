import { Module } from '@nestjs/common';
import { UsersGrpcModule } from './users/users.module';

@Module({
  imports: [UsersGrpcModule],
  exports: [UsersGrpcModule],
})
export class GrpcModule {}
