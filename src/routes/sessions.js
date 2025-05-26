import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import secure from '../middlewares/passportJWT.js';

const router = Router();

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);
    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  })(req, res, next);
});

// Current
router.get('/current', secure, (req, res) => {
  res.json({ user: req.user });
});

export default router;
