import { Router } from 'express';
import User from '../models/User.js';
import secure from '../middlewares/passportJWT.js';

const router = Router();

// Crear usuario
router.post('/', async (req, res) => {
  const u = new User(req.body);
  await u.save();
  res.status(201).json({ message: 'Usuario creado' });
});

// Listar usuarios (sin pass)
router.get('/', secure, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Obtener 1 usuario por id
router.get('/:id', secure, async (req, res) => {
  const u = await User.findById(req.params.id).select('-password');
  res.json(u);
});

// Actualizar usuario por id
router.put('/:id', secure, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Usuario actualizado' });
});

// Borrar usuario por id
router.delete('/:id', secure, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Usuario eliminado' });
});

export default router;
