import { Router } from 'express';
import usersService from '../services/users.service.js';

const router = Router();

router.get('/:id', usersService.getuser);
router.post('/:id', usersService.adduser);
// router.put('/updateUser', usersService.updateuser);
// router.delete('/deleteUser', usersService.deleteuser);

export default router;
