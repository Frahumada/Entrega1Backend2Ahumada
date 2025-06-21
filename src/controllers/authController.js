import UserRepository from '../repositories/UserRepository.js';
import { createHash, isValidPassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserRepository.findUserByEmail(email);

    if (!user || !isValidPassword(password, user.password)) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
        subject: user._id.toString()
      }
    );

    res.json({ token });
  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    const exists = await UserRepository.findUserByEmail(email);
    if (exists) return res.status(409).json({ message: 'Usuario ya existe' });

    const newUser = await UserRepository.registerUser({
      email,
      password,
      ...rest
    });

    res.status(201).json({ message: 'Usuario registrado', user: newUser });
  } catch (err) {
    console.error("❌ Error en register:", err);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};
