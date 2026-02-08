import { ApplicationMode } from './config/enums/config.enum';
import { HttpApplication } from './main-http';
import { GrpcApplication } from './main-grpc';
import { HttpGrpcApplication } from './main-http-grpc';
import _CONFIG from './config';

async function bootstrap() {
  const mode = _CONFIG.app.mode;

  let application: HttpApplication | GrpcApplication | HttpGrpcApplication;

  switch (mode) {
    case ApplicationMode.http:
      application = new HttpApplication();
      break;
    case ApplicationMode.grpc:
      application = new GrpcApplication();
      break;
    case ApplicationMode.http_grpc:
      application = new HttpGrpcApplication();
      break;
    default:
      throw new Error(`Unhandled ApplicationMode: ${mode}`);
  }

  await application.initialize();
}
bootstrap();
