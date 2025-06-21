import * as userDAO from '../dao/UserDAO.js';
import { createHash } from '../utils/hash.js';

class UserRepository {
  async registerUser(data) {
  const hashedPassword = createHash(data.password);
  const userData = { ...data, password: hashedPassword };
  return await userDAO.createUser(userData);
}

  async getAllUsers() {
    return await userDAO.getUsers();
  }

  async findUserByEmail(email) {
    return await userDAO.getUserByEmail(email);
  }

  async findUserById(id) {
    return await userDAO.getUserById(id);
  }

  async updateUser(id, data) {
    return await userDAO.updateUser(id, data);
  }

  async deleteUser(id) {
    return await userDAO.deleteUser(id);
  }
}

export default new UserRepository();
