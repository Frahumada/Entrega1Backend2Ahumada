
import User from '../models/User.js';

export async function createUser(data) {
  // recibo los datos del usuario y los guardo en la base de datos (ya se valido que no exista en el repostory)
  const newUser = await new User(data).save();
  return newUser;
}

export async function getUsers() {
  return User.find().select('-password');
}

export async function getUserByEmail(email) {
  return User.findOne({ email });
}

export async function getUserById(id) {
  return User.findById(id).select('-password');
}

export async function updateUser(id, data) {
  // Actualizo el usuario por su ID y devuelvo el usuario actualizado
  return User.findByIdAndUpdate(id, data,{ new: true });
}

export async function deleteUser(id) {
  return User.findByIdAndDelete(id);
}
