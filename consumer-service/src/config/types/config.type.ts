import { NodeEnv } from '../enums/config.enum';

export type ServerConfig = {
  host: string;
  port: number;
};

export type RoutesConfig = {
  globalPrefix: string;
};

export type ServiceConfig = {
  host: string;
  port: number;
};

export type ApplicationConfig = {
  routes: RoutesConfig;
  grpc: {
    timeoutMs: number;
  }
};

export type Config = {
  nodeEnv: keyof typeof NodeEnv;
  server: ServerConfig;
  app: ApplicationConfig;
  services: {
    producer: ServiceConfig;
  };
};
