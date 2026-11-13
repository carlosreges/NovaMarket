const productModel = require('../models/productModel');

const productController = {
  /**
   * Listar productos (con filtro opcional por categoría)
   * GET /api/products
   */
  async getAll(req, res) {
    try {
      const { category } = req.query;
      const products = await productModel.getAll({
        categoryId: category ? parseInt(category) : undefined,
        isActive: true
      });
      res.json({ success: true, data: { products } });
    } catch (err) {
      console.error('Error al obtener productos:', err.message);
      res.status(500).json({ success: false, message: 'Error al obtener productos' });
    }
  },

  /**
   * Obtener un producto por ID
   * GET /api/products/:id
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await productModel.getById(parseInt(id));
      if (!product) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      }
      res.json({ success: true, data: { product } });
    } catch (err) {
      console.error('Error al obtener producto:', err.message);
      res.status(500).json({ success: false, message: 'Error al obtener producto' });
    }
  },

  /**
   * Crear producto (solo admin)
   * POST /api/products
   */
  async create(req, res) {
    try {
      const { name, description, price, stock, category_id, image_url } = req.body;

      if (!name || price == null || stock == null) {
        return res.status(400).json({ success: false, message: 'Nombre, precio y stock son requeridos' });
      }

      const product = await productModel.create({
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category_id: category_id ? parseInt(category_id) : null,
        image_url
      });

      res.status(201).json({ success: true, message: 'Producto creado', data: { product } });
    } catch (err) {
      console.error('Error al crear producto:', err.message);
      res.status(500).json({ success: false, message: 'Error al crear producto' });
    }
  },

  /**
   * Actualizar producto (solo admin)
   * PUT /api/products/:id
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const product = await productModel.update(parseInt(id), req.body);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      }
      res.json({ success: true, message: 'Producto actualizado', data: { product } });
    } catch (err) {
      console.error('Error al actualizar producto:', err.message);
      res.status(500).json({ success: false, message: 'Error al actualizar producto' });
    }
  },

  /**
   * Eliminar producto (solo admin)
   * DELETE /api/products/:id
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await productModel.delete(parseInt(id));
      if (!product) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      }
      res.json({ success: true, message: 'Producto eliminado' });
    } catch (err) {
      console.error('Error al eliminar producto:', err.message);
      res.status(500).json({ success: false, message: 'Error al eliminar producto' });
    }
  },
};

module.exports = productController;