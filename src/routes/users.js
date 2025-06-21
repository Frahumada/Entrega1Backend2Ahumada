import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser, createUser } from '../controllers/userController.js';

import secure from '../middlewares/passportJWT.js';

const router = Router();

router.get('/', secure, getUsers);
router.get('/:uid', secure, getUserById);
router.put('/:uid', secure, updateUser);
router.post('/', createUser);
router.delete('/:uid', secure, deleteUser);

export default router;

