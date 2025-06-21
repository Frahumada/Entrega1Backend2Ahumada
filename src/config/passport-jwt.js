import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  'jwt',
  new JwtStrategy(opts, async (payload, done) => {
    console.log('🔍 JWT payload recibido:', payload);
    try {
      const user = await User.findById(payload.sub).select('-password');
      if (!user) return done(null, false);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  })
);
