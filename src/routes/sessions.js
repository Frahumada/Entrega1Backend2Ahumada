import { Router } from 'express';
import secure from '../middlewares/passportJWT.js';
import { login, getCurrent } from '../controllers/authController.js';


const router = Router();

// Login
router.post('/login', login);

// Current
router.get('/current', secure, getCurrent);


export default router;
