import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !user.isValidPassword(password))
          return done(null, false, { message: 'Credenciales inválidas' });
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
