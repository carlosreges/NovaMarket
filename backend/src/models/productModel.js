const pool = require('../config/db');

const productModel = {
  async getAll({ categoryId, isActive = true } = {}) {
    let query = `SELECT p.*, c.name AS category_name 
                 FROM products p 
                 LEFT JOIN categories c ON p.category_id = c.id`;
    const params = [];
    const conditions = [];

    if (isActive) {
      conditions.push(`p.is_active = $${params.length + 1}`);
      params.push(isActive);
    }

    if (categoryId) {
      conditions.push(`p.category_id = $${params.length + 1}`);
      params.push(categoryId);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }

    query += ` ORDER BY p.created_at DESC`;

    const result = await pool.query(query, params);
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query(
      `SELECT p.*, c.name AS category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  async create({ name, description, price, stock, category_id, image_url, color, brand }) {
    const result = await pool.query(
      `INSERT INTO products (name, description, price, stock, category_id, image_url, color, brand) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [name, description, price, stock, category_id, image_url, color, brand]
    );
    return result.rows[0];
  },

  async update(id, updates) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    const allowedFields = ['name', 'description', 'price', 'stock', 'category_id', 'image_url', 'color', 'brand', 'is_active'];
    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    }

    if (fields.length === 0) return null;

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  async delete(id) {
    const result = await pool.query(
      `DELETE FROM products WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] || null;
  },
};

module.exports = productModel;