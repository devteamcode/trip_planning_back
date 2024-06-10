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
});

const variables = new ConfigService(envSchema);

export const envs = {
  port: variables.get('PORT'),
  apiPrefix: variables.get('API_PREFIX'),
  apiName: variables.get('API_NAME'),
};
