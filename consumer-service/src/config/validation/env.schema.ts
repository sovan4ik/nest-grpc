import Joi from 'joi';
import { NodeEnv } from '../enums/config.enum';

export const EnvValidationSchema = {
  envFilePath: `.${process.env.NODE_ENV}.env`,
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid(...Object.values(NodeEnv))
      .default(NodeEnv.development),
    APP_HOST: Joi.string().hostname().default('0.0.0.0'),
    APP_PORT: Joi.number().port().default(3002),
    APP_ROUTES_GLOBAL_PREFIX: Joi.string().default('/api/v1'),
    APP_GRPC_TIMEOUT_MS: Joi.number().default(5000),
    PRODUCER_SERVICE_GRPC_HOST: Joi.string().hostname().default('0.0.0.0'),
    PRODUCER_SERVICE_GRPC_PORT: Joi.number().port().default(50051),
  }),
};
