import ProductRepository from '../repositories/ProductRepository.js';

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, stock } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: 'Título y precio son obligatorios' });
    }

    const newProduct = await ProductRepository.createProduct({
      title,
      description,
      price,
      stock,
    });

    res.status(201).json({ message: 'Producto creado', product: newProduct });
  } catch (error) {
    console.error('❌ Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductRepository.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};