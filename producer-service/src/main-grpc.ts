import { NestFactory } from '@nestjs/core';
import { Logger, INestMicroservice } from '@nestjs/common';

import { MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';

import _CONFIG from './config';
import { grpcMicroserviceOptions } from './config/server/grpc-microservice-options';
import { AllExceptionsFilter } from './modules/common/filter/all-exceptions.filter';

export class GrpcApplication {
  declare private application: INestMicroservice;
  declare private logger: Logger;

  constructor() {}

  async initialize() {
    this.application =
      await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        grpcMicroserviceOptions,
      );

    this.logger = new Logger('gRPC');
    this.setup();
    await this.start();
  }

  private setup() {
    this.setupFilters();
  }

  private setupFilters() {
    const filter = new AllExceptionsFilter(this.logger);
    this.application.useGlobalFilters(filter);
  }

  private async start() {
    await this.application.listen();
    this.logger.log(
      `gRPC server listening on: ${grpcMicroserviceOptions.options.url}`,
    );
    [...grpcMicroserviceOptions.options.package].forEach((p) =>
      this.logger.log(`↳ gRPC package registered: ${p}`),
    );
  }
}
