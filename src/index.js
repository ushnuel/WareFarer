import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import Route from './routes';
import { ErrorHandler, feedbackHandler } from './Handlers';

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.user = { id: 'an id' };
  next();
});

app.use('/api/v1', Route);

app.get('/', (req, res) => res.json({
  id: req.user.id,
  message: 'Welcome to Warefarer server API',
}));

app.use('*', (req, res, next) => {
  const error = new ErrorHandler('Not Found', 404);
  next(error);
});

app.use(feedbackHandler.error);

app.listen(PORT, () => {
  console.log('app has started on ', PORT);
});

export default app;
