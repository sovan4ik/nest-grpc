import { NodeEnv } from '../enums/config.enum';
import { Config } from '../types/config.type';

const applicationProductionConfig: Config = {
  nodeEnv: NodeEnv.production,
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
};

export default applicationProductionConfig;
