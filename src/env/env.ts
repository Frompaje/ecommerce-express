import { Injectable } from '@nestjs/common';
import { z } from 'zod';

export const envSchema = z.object({
  JWT_SECRET_KEY: z.string(),
  PORT: z.coerce.number().optional().default(3000),
});

export const validateEnv = (env: Record<string, any>) => {
  const _env = envSchema.safeParse(env);

  if (!_env.success) {
    console.error('Invalid environment variables');

    throw new Error('Invalid environment variables');
  }

  return _env.data;
};

export type Env = z.infer<typeof envSchema>;
