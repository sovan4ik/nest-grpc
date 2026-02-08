import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import _CONFIG from './config';
import { AllExceptionsFilter } from './modules/common/filter/all-exceptions.filter';

export class Application {
  declare private application: NestFastifyApplication;
  declare private logger: Logger;

  constructor() {}

  async initialize() {
    this.application = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    this.logger = new Logger('HTTP/Client');
    this.setup();
    await this.start();
  }

  private setup() {
    this.setGlobalPrefix();
    this.setupFilters();
  }

  private setGlobalPrefix() {
    const globalPrefix = _CONFIG.app.routes.globalPrefix;
    this.application.setGlobalPrefix(globalPrefix);
  }

  private setupFilters() {
    const filter = new AllExceptionsFilter(this.logger);
    this.application.useGlobalFilters(filter);
  }

  private async start() {
    await this.application.listen(_CONFIG.server.port, _CONFIG.server.host);
    this.logger.log(
      `Application listening on: ${await this.application.getUrl()}`,
    );
  }
}
const application = new Application();
application.initialize();
