import { NodeEnv } from '../enums/config.enum';
import { Config } from '../types/config.type';

const applicationDevelopmentConfig: Config = {
  nodeEnv: NodeEnv.development,
  server: {
    http: {
      host: process.env.APP_HOST,
      port: Number(process.env.APP_HTTP_PORT),
    },
    grpc: {
      host: process.env.APP_HOST,
      port: Number(process.env.APP_GRPC_PORT),
    },
  },
  app: {
    mode: process.env.APP_MODE,
    routes: {
      globalPrefix: process.env.APP_ROUTES_GLOBAL_PREFIX,
    },
  },
} as const;

export default applicationDevelopmentConfig;
