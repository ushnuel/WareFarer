import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import Routes from './routes';
import { ErrorHandler, feedbackHandler } from './Handlers';
import config from './config';

const app = express();

app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api/v1', Routes);

app.get('/', (req, res) => res.json({
  id: req.user.id,
  message: 'Welcome to Warefarer server API',
}));

app.use('*', (req, res, next) => {
  const error = new ErrorHandler('Not Found', 404);
  next(error);
});

app.use(feedbackHandler.error);

app.listen(config.PORT, () => {
  console.log('app has started on', config.PORT);
});

export default app;
