// eslint-disable-next-line canonical/filename-match-exported
import './src/boilerplate.polyfill';

import { type TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';

import { AdminSubscriber } from './src/entity-subscribers/admin-subscriber';
import { UserSubscriber } from './src/entity-subscribers/user-subscriber';
// import { SnakeNamingStrategy } from './src/snake-naming.strategy';

dotenv.config();

const configs: TypeOrmModuleOptions & { seeds: string[] } = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // namingStrategy: new SnakeNamingStrategy(), // Redbrick no need naming
  subscribers: [UserSubscriber, AdminSubscriber],
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
};

module.exports = configs;
