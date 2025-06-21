import userRepository from '../repositories/UserRepository.js';
import { createHash } from '../utils/hash.js';


export const createUser = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    const newUser = await userRepository.registerUser({
      ...rest,
      email,
      password: createHash(password)
    });

    res.status(201).json({ message: 'Usuario creado', user: newUser });
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userRepository.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userRepository.findUserById(uid);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const updated = await userRepository.updateUser(uid, req.body);
    res.json({ message: 'Usuario actualizado', updated });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    await userRepository.deleteUser(uid);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
