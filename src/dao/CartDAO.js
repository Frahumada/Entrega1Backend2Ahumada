import CartModel from '../models/Cart.js';

export async function getCartById(cid) {
  return await CartModel.findById(cid).populate('products.product');
}

export async function updateCart(cid, data) {
  return await CartModel.findByIdAndUpdate(cid, data, { new: true });
}
