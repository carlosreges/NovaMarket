const pool = require('../config/db');

const cartModel = {
  /**
   * Obtener o crear el carrito activo del usuario
   */
  async getOrCreateActiveCart(userId) {
    let result = await pool.query(
      `SELECT * FROM carts WHERE user_id = $1 AND status = 'active' ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    result = await pool.query(
      `INSERT INTO carts (user_id, status) VALUES ($1, 'active') RETURNING *`,
      [userId]
    );
    return result.rows[0];
  },

  /**
   * Obtener ítems del carrito activo del usuario
   */
  async getItems(userId) {
    const cart = await this.getOrCreateActiveCart(userId);
    const result = await pool.query(
      `SELECT ci.id, ci.product_id, p.name AS product_name, p.price, p.stock, ci.quantity 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.cart_id = $1 
       ORDER BY ci.id ASC`,
      [cart.id]
    );
    return { cart, items: result.rows };
  },

  /**
   * Agregar producto al carrito activo
   */
  async addItem({ userId, productId, quantity = 1 }) {
    const cart = await this.getOrCreateActiveCart(userId);

    const existing = await pool.query(
      `SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2`,
      [cart.id, productId]
    );

    if (existing.rows.length > 0) {
      const result = await pool.query(
        `UPDATE cart_items SET quantity = quantity + $1 
         WHERE cart_id = $2 AND product_id = $3 
         RETURNING *`,
        [quantity, cart.id, productId]
      );
      await pool.query(`UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1`, [cart.id]);
      return result.rows[0];
    }

    const result = await pool.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [cart.id, productId, quantity]
    );
    await pool.query(`UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1`, [cart.id]);
    return result.rows[0];
  },

  /**
   * Actualizar cantidad de un ítem en el carrito (por cart_id)
   */
  async updateItem(cartId, productId, quantity) {
    const result = await pool.query(
      `UPDATE cart_items SET quantity = $1 
       WHERE cart_id = $2 AND product_id = $3 
       RETURNING *`,
      [quantity, cartId, productId]
    );
    if (result.rows.length > 0) {
      await pool.query(`UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1`, [cartId]);
    }
    return result.rows[0] || null;
  },

  /**
   * Eliminar un ítem del carrito (por cart_id)
   */
  async removeItem(cartId, productId) {
    const result = await pool.query(
      `DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *`,
      [cartId, productId]
    );
    if (result.rows.length > 0) {
      await pool.query(`UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1`, [cartId]);
    }
    return result.rows[0] || null;
  },

  /**
   * Marcar carrito como abandonado o convertido
   */
  async updateStatus(cartId, status) {
    const result = await pool.query(
      `UPDATE carts SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [status, cartId]
    );
    return result.rows[0] || null;
  },

  /**
   * Obtener carrito por ID
   */
  async getById(cartId) {
    const result = await pool.query(
      `SELECT * FROM carts WHERE id = $1`,
      [cartId]
    );
    return result.rows[0] || null;
  },

  /**
   * Obtener todos los carritos con estado (para analytics de abandono)
   */
  async getAllWithStatus() {
    const result = await pool.query(
      `SELECT c.*, u.name AS user_name, u.email AS user_email 
       FROM carts c 
       JOIN users u ON c.user_id = u.id 
       ORDER BY c.updated_at DESC`
    );
    return result.rows;
  },
};

module.exports = cartModel;