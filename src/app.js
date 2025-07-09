import express from 'express';
import passport from 'passport';
import userRoutes from './routes/users.js';
import sessionRoutes from './routes/sessions.js';
import productRoutes from './routes/products.js';
import passwordRoutes from './routes/password.js';
import cartRoutes from './routes/carts.js';
import './config/passport-local.js';
import './config/passport-jwt.js';

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/carts', cartRoutes);


export default app;
