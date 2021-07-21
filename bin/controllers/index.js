import { Router } from 'express';
import auth from '../middleware/authapi.js';
import authContoller from './auth.controller.js';
import userContoller from './users.controller.js';

const router = Router();

const unprotectedRoutes = [
  {
    path: '/auth',
    route: authContoller,
  },
];

const protectedRoutes = [
  {
    path: '/user',
    route: userContoller,
  },
];

unprotectedRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

protectedRoutes.forEach((route) => {
  router.use(route.path, auth());
  router.use(route.path, route.route);
});

export default router;
