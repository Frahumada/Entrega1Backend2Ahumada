import {getAllProducts, getProductById, updateProduct} from '../dao/ProductDAO.js';

class ProductRepository {
  async createProduct(data) {
    return await productDAO.createProduct(data);
  }

  async getAllProducts() {
    return await getAllProducts();
  }

  async getProductById(id) {
    return await getProductById(id);
  }

  async updateProduct(id, data) {
  return await updateProduct(id, data);
}
}

export default new ProductRepository();
