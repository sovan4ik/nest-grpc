import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { GrpcModule } from './modules/grpc/grpc.module';

@Module({
  imports: [ConfigModule, GrpcModule],
  providers: [Logger],
})
export class AppModule {}
