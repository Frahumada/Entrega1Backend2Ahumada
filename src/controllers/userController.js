import userRepository from '../repositories/UserRepository.js';


export const createUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }
    if (req.body.password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }
    if (req.body.role && !['user'].includes(req.body.role)) {
      return res.status(400).json({ message: 'Rol inválido. Debe ser user' });
    }
    const newUser = await userRepository.registerUser(req.body);
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
