import dotenv from 'dotenv';

dotenv.config();

const config = {};

switch (process.env.NODE_ENV) {
  case 'test':
    config.PORT = process.env.TEST_PORT;
    config.DB = process.env.TEST_DB;
    break;

  case 'dev':
    config.PORT = process.env.DEV_PORT;
    config.DB = process.env.DB;
    break;

  case 'prod':
    config.PORT = process.env.PORT;
    config.DB = process.env.DB;
    break;

  default:
    config.PORT = process.env.PORT || 3000;
    config.DB = process.env.DB;
}

export default config;
