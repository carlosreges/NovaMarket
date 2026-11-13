const pool = require('../config/db');

const categoryModel = {
  async getAll() {
    const result = await pool.query(
      `SELECT * FROM categories ORDER BY name ASC`
    );
    return result.rows;
  },

  async create({ name, slug }) {
    const result = await pool.query(
      `INSERT INTO categories (name, slug) 
       VALUES ($1, $2) 
       RETURNING *`,
      [name, slug]
    );
    return result.rows[0];
  },

  async getById(id) {
    const result = await pool.query(
      `SELECT * FROM categories WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  async getProductsByCategory(categoryId) {
    const result = await pool.query(
      `SELECT * FROM products WHERE category_id = $1 AND is_active = true ORDER BY name ASC`,
      [categoryId]
    );
    return result.rows;
  },
};

module.exports = categoryModel;