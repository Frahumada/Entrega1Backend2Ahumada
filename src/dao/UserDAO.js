
import User from '../models/User.js';

export async function createUser(data) {
  return await new User(data).save();
}

export async function getUsers() {
  return User.find().select('-password');
}

export async function getUserByEmail(email) {
  console.log('📨 Buscando email en DAO:', email);
  return User.findOne({ email });
}

export async function getUserById(id) {
  return User.findById(id).select('-password');
}

export async function updateUser(id, data) {
  return User.findByIdAndUpdate(id, data);
}

export async function deleteUser(id) {
  return User.findByIdAndDelete(id);
}
