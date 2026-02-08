declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development';
      APP_HOST: string;
      APP_PORT: string;
      APP_ROUTES_GLOBAL_PREFIX: string;
      APP_GRPC_TIMEOUT_MS: string;
      PRODUCER_SERVICE_GRPC_HOST: string; 
      PRODUCER_SERVICE_GRPC_PORT: string; 
    }
  }
}

export {};
