import Joi from 'joi';
import { ApplicationMode, NodeEnv } from '../enums/config.enum';

export const EnvValidationSchema = {
  envFilePath: `.${process.env.NODE_ENV}.env`,
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid(...Object.values(NodeEnv))
      .default(NodeEnv.development),
    APP_MODE: Joi.string()
      .valid(...Object.values(ApplicationMode))
      .default(ApplicationMode.http_grpc),
    APP_HOST: Joi.string().hostname().default('0.0.0.0'),
    APP_HTTP_PORT: Joi.number().port().default(3001),
    APP_GRPC_PORT: Joi.number().port().default(50051),
    APP_ROUTES_GLOBAL_PREFIX: Joi.string().default('/api/v1'),
  }),
};
