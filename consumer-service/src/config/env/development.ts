import { NodeEnv } from '../enums/config.enum';
import { Config } from '../types/config.type';

const applicationDevelopmentConfig: Config = {
  nodeEnv: NodeEnv.development,
  server: {
    host: process.env.APP_HOST,
    port: Number(process.env.APP_PORT),
  },
  app: {
    routes: {
      globalPrefix: process.env.APP_ROUTES_GLOBAL_PREFIX,
    },
    grpc: {
      timeoutMs: Number(process.env.APP_GRPC_TIMEOUT_MS),
    },
  },
  services: {
    producer: {
      host: process.env.PRODUCER_SERVICE_GRPC_HOST,
      port: Number(process.env.PRODUCER_SERVICE_GRPC_PORT),
    },
  },
} as const;

export default applicationDevelopmentConfig;
