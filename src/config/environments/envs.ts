import { ConfigService } from '@nestjs/config';

import 'dotenv/config';
import * as Joi from 'joi';
import { Environment } from '../enum/state.enum';

export const envSchema = Joi.object({
  STATE: Joi.string()
    .valid(Environment.Development, Environment.Production)
    .required(),
  PORT: Joi.number().required(),
  API_PREFIX: Joi.string().valid('v1/api').required(),
  API_NAME: Joi.string().required(),
  BD_HOST: Joi.string().required(),
  BD_PORT: Joi.number().required(),
  BD_USERNAME: Joi.string().required(),
  BD_PASSWORD: Joi.string().required(),
  BD_NAME: Joi.string().required(),
});

const variables = new ConfigService(envSchema);

export const envs = {
  port: variables.get('PORT'),
  apiPrefix: variables.get('API_PREFIX'),
  apiName: variables.get('API_NAME'),
  bdHost: variables.get('BD_HOST'),
  bdPort: variables.get('BD_PORT'),
  bdUsername: variables.get('BD_USERNAME'),
  bdPassword: variables.get('BD_PASSWORD'),
  bdName: variables.get('BD_NAME'),
};
