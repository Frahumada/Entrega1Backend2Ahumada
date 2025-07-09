import * as userDAO from '../dao/UserDAO.js';
import { createHash } from '../utils/hash.js';
import CartModel from '../models/Cart.js';

class UserRepository {
  async registerUser(data) {
    // alojo data del usuario en variables
    const { password, ...rest } = data;

    //hasheo la contraseña
    const hashedPassword = createHash(password);

    // Verifico si el usuario ya existe pasando su email por el DAO
    const existeUser = await userDAO.getUserByEmail(data.email);
    if (existeUser) {
      throw new Error('El email ya está registrado');
    }
    const newCart = await CartModel.create({ products: [] });
    // Si no existe, creo el usuario pasando los datos al DAO y retorno el usuario creado
    return await userDAO.createUser({
      ...rest,
      email: data.email,
      password: hashedPassword,
      cart: newCart._id,
    });
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
