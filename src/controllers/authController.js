import UserRepository from '../repositories/UserRepository.js';
import { isValidPassword } from '../utils/hash.js';
import UserDTO from '../dto/UserDTO.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {

  try {
    //recibir email y password del body y validar que no esten vacios
    const { email, password } = req.body;

    //paso email por UserRepository para buscar el usuario
    const user = await UserRepository.findUserByEmail(email);

    //validar que el usuario exista
    if (!user) {
      console.log('❌ Usuario no encontrado');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    //validar que la contraseña sea correcta pasndolo por isValidPassword de hash.js
    const passwordValid = isValidPassword(password, user.password);
    if (!passwordValid) {
      console.log('❌ Contraseña incorrecta');
      return res.status(401).json({ message: 'Credenciales inválidas' });
}
    // Generar token JWT pasando el id del usuario y su rol
    const token = jwt.sign(
      { sub: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Devolver el token y los datos del usuario (sin la contraseña)
    res.json({
      token,
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        cart: user.cart,
        role: user.role
      }
    });

  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ message: 'Error en login' });
  }
};

export const register = async (req, res) => {
  //recibir email, password y resto de datos del body
  const { email, password, ...rest } = req.body;

  //validar existencia de email
  const exists = await UserRepository.findUserByEmail(email);
  if (exists) return res.status(409).json({ message: 'Usuario ya existe' });

  //crear un nuevo usuario pasando el email, password y resto de datos por UserRepository.registerUser
  const newUser = await UserRepository.registerUser({
    ...rest,
    email,
    password,
  });
  //devolver un mensaje de éxito y el usuario creado
  res.status(201).json({ message: 'Usuario registrado', user: newUser });
};

export const getCurrent = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  const safeUser = new UserDTO(req.user);
  res.json({ status: 'success', user: safeUser });
};