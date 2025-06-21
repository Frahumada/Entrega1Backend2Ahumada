import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import secure from '../middlewares/passportJWT.js';
import { login, register } from '../controllers/authController.js';
import UserDTO from '../dto/UserDTO.js';

const router = Router();

// Login
router.post('/login', login);

// Current
router.get('/current', secure, (req, res) => {
  const safeUser = new UserDTO(req.user);
  res.json({ user: safeUser });
});

export default router;
