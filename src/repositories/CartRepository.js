import {getCartById, updateCart} from '../dao/CartDAO.js';

class CartRepository {
  async getCartById(cid) {
    return await getCartById(cid);
  }

  async updateCart(cid, data) {
    return await updateCart(cid, data);
  }


}

export default new CartRepository();
