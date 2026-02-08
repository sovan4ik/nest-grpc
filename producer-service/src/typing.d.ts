declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development';
      APP_MODE: 'http' | 'grpc' | 'http_grpc';
      APP_HOST: string;
      APP_HTTP_PORT: string;
      APP_GRPC_PORT: string;
      APP_ROUTES_GLOBAL_PREFIX: string;
    }
  }
}

export {};
