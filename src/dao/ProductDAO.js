import ProductModel from '../models/Products.js';
import Product from '../models/Products.js';


export async function createProduct(data) {
  return await ProductModel.create(data);
}

export async function getAllProducts() {
  return await ProductModel.find();
}

export async function getProductById(id) {
  return await Product.findById(id);
}

export async function updateProduct(id, data) {
  return await Product.findByIdAndUpdate(id, data, { new: true });
}
