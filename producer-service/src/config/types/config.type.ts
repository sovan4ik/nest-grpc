import { ApplicationMode, NodeEnv } from '../enums/config.enum';

export type ServerConfig = {
  host: string;
  port: number;
};

export type RoutesConfig = {
  globalPrefix: string;
};

export type ApplicationConfig = {
  mode: keyof typeof ApplicationMode;
  routes: RoutesConfig;
};

export type Config = {
  nodeEnv: keyof typeof NodeEnv;
  app: ApplicationConfig;
  server: {
    http: ServerConfig;
    grpc: ServerConfig;
  };
};
