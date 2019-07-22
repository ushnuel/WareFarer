import 'dotenv/config';

const config = {};

switch (process.env.NODE_ENV) {
  case 'dev':
    config.PORT = process.env.DEV_PORT;
    config.DB = process.env.DB;
    break;

  case 'prod':
    config.PORT = process.env.PORT;
    config.DB = process.env.DATABASE_URL;
    break;

  default:
    config.PORT = process.env.PORT || 3000;
    config.DB = process.env.DB;
}
config.PUBLIC_KEY = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');
config.PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

export default config;
