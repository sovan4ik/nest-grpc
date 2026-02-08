import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import _CONFIG from './config';
import { grpcMicroserviceOptions } from './config/server/grpc-microservice-options';
import { AllExceptionsFilter } from './modules/common/filter/all-exceptions.filter';

export class HttpGrpcApplication {
  declare private application: NestFastifyApplication;
  declare private logger: Logger;

  constructor() {}

  async initialize() {
    this.application = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    this.logger = new Logger('HTTP/gRPC');
    await this.setup();
    await this.start();
  }

  private async setup() {
    this.setGlobalPrefix();
    this.setupFilters();
    await this.connectMicroservices();
  }

  private setGlobalPrefix() {
    // only for http
    const globalPrefix = _CONFIG.app.routes.globalPrefix;
    this.application.setGlobalPrefix(globalPrefix);
  }

  private setupFilters() {
    const filter = new AllExceptionsFilter(this.logger);
    this.application.useGlobalFilters(filter);
  }

  private async connectMicroservices() {
    this.application.connectMicroservice<MicroserviceOptions>(
      grpcMicroserviceOptions,
      { inheritAppConfig: true },
    );

    await this.application.startAllMicroservices();
    this.logger.log(
      `gRPC server listening on: ${grpcMicroserviceOptions.options.url}`,
    );
    [...grpcMicroserviceOptions.options.package].forEach((p) =>
      this.logger.log(`↳ gRPC package registered: ${p}`),
    );
  }
  private async start() {
    await this.application.listen(
      _CONFIG.server.http.port,
      _CONFIG.server.http.host,
    );
    this.logger.log(
      `Application listening on: ${await this.application.getUrl()}`,
    );
  }
}
