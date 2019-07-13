import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import debug from 'debug';
import Routes from './routes';
import { ErrorHandler, feedbackHandler } from './Handlers';
import config from './config';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', Routes);

app.get('/', (req, res) => res.json({
  message: 'Welcome to Warefarer server API',
}));

app.use('*', (req, res, next) => {
  const error = new ErrorHandler('Not Found', 404);
  next(error);
});

app.use(feedbackHandler.error);
app.set('port', config.PORT);
app.listen(3000, () => {
  debug('app has started on', config.PORT);
});

export default app;
