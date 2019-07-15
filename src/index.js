import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import debug from 'debug';
import swaggerUiExpress from 'swagger-ui-express';
import Routes from './routes';
import { ErrorHandler, feedbackHandler } from './Handlers';
import config from './config';
import swaggerJson from '../swagger.json';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(Routes);

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJson));
app.get('/', (req, res) => res.json({
  message: 'Welcome to Warefarer server API homepage',
}));

app.use('*', (req, res, next) => {
  const error = new ErrorHandler('Page Not Found', 404);
  next(error);
});

app.use(feedbackHandler.error);
app.set('port', config.PORT);
app.listen(config.PORT, () => {
  debug('app has started on', config.PORT);
});

export default app;
