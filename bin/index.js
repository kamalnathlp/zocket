import express from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import Router from './controllers/index.js';
import jwtStrategy from './middleware/auth.js';
import { errorConverter, errorHandler } from './middleware/error.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/api', Router);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
