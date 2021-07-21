import httpStatus from 'http-status';
import passport from 'passport';
import ApiError from '../utils/ApiError.js';

const verifyCallback =
  (req, res, resolve, reject) => async (err, user, info) => {
    try {
      if (err) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, err));
      } else if (info) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, info));
      } else {
        req.user = user.user;
        resolve();
        return;
      }
    } catch (error) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, error));
    }
  };

const auth = () => async (req, res, next) => {
  try {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { failureFlash: true },
        verifyCallback(req, res, resolve, reject)
      )(req, res, next);
    })
      .then(() => {
        next();
      })
      .catch((err) => {
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

export default auth;
