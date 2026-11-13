const categoryModel = require('../models/categoryModel');

const categoryController = {
  /**
   * Listar todas las categorías
   * GET /api/categories
   */
  async getAll(req, res) {
    try {
      const categories = await categoryModel.getAll();
      res.json({ success: true, data: { categories } });
    } catch (err) {
      console.error('Error al obtener categorías:', err.message);
      res.status(500).json({ success: false, message: 'Error al obtener categorías' });
    }
  },

  /**
   * Crear categoría (solo admin)
   * POST /api/categories
   */
  async create(req, res) {
    try {
      const { name, slug } = req.body;
      if (!name || !slug) {
        return res.status(400).json({ success: false, message: 'Nombre y slug son requeridos' });
      }

      const category = await categoryModel.create({ name, slug });
      res.status(201).json({ success: true, message: 'Categoría creada', data: { category } });
    } catch (err) {
      console.error('Error al crear categoría:', err.message);
      res.status(500).json({ success: false, message: 'Error al crear categoría' });
    }
  },
};

module.exports = categoryController;