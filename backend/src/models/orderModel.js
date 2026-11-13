const pool = require('../config/db');

const orderModel = {
  async create({ userId, total, items, discount = 0, payment_method }) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const orderResult = await client.query(
        `INSERT INTO orders (user_id, total, status, discount, payment_method) 
         VALUES ($1, $2, 'pending', $3, $4) 
         RETURNING *`,
        [userId, total, discount, payment_method]
      );
      const order = orderResult.rows[0];

      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, unit_price) 
           VALUES ($1, $2, $3, $4)`,
          [order.id, item.productId, item.quantity, item.price]
        );
      }

      // Marcar carrito activo como convertido
      await client.query(
        `UPDATE carts SET status = 'converted', updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = $1 AND status = 'active'`,
        [userId]
      );

      await client.query('COMMIT');
      return order;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  async getById(id, userId, isAdmin = false) {
    let query = `SELECT * FROM orders WHERE id = $1`;
    const params = [id];

    if (!isAdmin) {
      query += ` AND user_id = $2`;
      params.push(userId);
    }

    const result = await pool.query(query, params);
    return result.rows[0] || null;
  },

  async getItems(orderId) {
    const result = await pool.query(
      `SELECT oi.id, oi.product_id, p.name AS product_name, oi.quantity, oi.unit_price 
       FROM order_items oi 
       JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = $1`,
      [orderId]
    );
    return result.rows;
  },

  async getAllForUser(userId) {
    const result = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  async getAll() {
    const result = await pool.query(
      `SELECT o.*, u.name AS user_name, u.email AS user_email 
       FROM orders o 
       JOIN users u ON o.user_id = u.id 
       ORDER BY o.created_at DESC`
    );
    return result.rows;
  },

  async updateStatus(id, status) {
    const result = await pool.query(
      `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0] || null;
  },
};

module.exports = orderModel;