import { Router } from 'express';
import authService from '../services/auth.service.js';

const router = Router();

router.post('/signup', authService.signUpUser);
router.post('/login', authService.loginUser);

export default router;
