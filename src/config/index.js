import dotenv from 'dotenv';

dotenv.config();

const config = {};

switch (process.env.NODE_ENV) {
  case 'dev':
    config.PORT = process.env.PORT;
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
