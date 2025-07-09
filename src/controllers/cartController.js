import CartRepository from '../repositories/CartRepository.js';
import ProductRepository from '../repositories/ProductRepository.js';
import TicketRepository from '../repositories/TicketRepository.js';
import { v4 as uuidv4 } from 'uuid';

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartRepository.getCartById(cid);

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío o no existe' });
    }

    let total = 0;
    const productosComprables = [];
    const productosSinStock = [];

    for (const item of cart.products) {
      const product = await ProductRepository.getProductById(item.product._id);

      if (product.stock >= item.quantity) {
        total += product.price * item.quantity;
        product.stock -= item.quantity;
        await ProductRepository.updateProduct(product._id, { stock: product.stock });
        productosComprables.push(item);
      } else {
        productosSinStock.push(item);
      }
    }

    if (productosComprables.length === 0) {
      return res.status(400).json({ message: 'No hay productos con stock suficiente' });
    }

    const ticketData = {
      code: uuidv4(),
      amount: total,
      purchaser: req.user.email,
    };

    const ticket = await TicketRepository.createTicket(ticketData);

    cart.products = productosSinStock;
    await cart.save();

    res.json({
      message: 'Compra realizada',
      ticket,
      productos_sin_stock: productosSinStock,
    });
  } catch (error) {
    console.error('❌ Error en purchaseCart:', error);
    res.status(500).json({ message: 'Error al procesar la compra' });
  }
};


export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await CartRepository.getCartById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    const product = await ProductRepository.getProductById(pid);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    const itemIndex = cart.products.findIndex(p => p.product._id.toString() === pid);

    if (itemIndex >= 0) {
      cart.products[itemIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();

    res.json({ message: 'Producto agregado al carrito', cart });
  } catch (error) {
    console.error('❌ Error al agregar producto al carrito:', error);
    res.status(500).json({ message: 'Error interno al agregar al carrito' });
  }
};