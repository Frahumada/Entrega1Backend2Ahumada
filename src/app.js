import express from 'express';
import passport from 'passport';
import userRoutes from './routes/users.js';
import sessionRoutes from './routes/sessions.js';
import './config/passport-local.js';
import './config/passport-jwt.js';

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);

export default app;
