const cartModel = require('../models/cartModel');

const cartController = {
  /**
   * Ver ítems del carrito activo del usuario autenticado
   * GET /api/cart/items
   */
  async getItems(req, res) {
    try {
      const userId = req.user.id;
      const { cart, items } = await cartModel.getItems(userId);
      const total = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
      res.json({ success: true, data: { cart, items, total } });
    } catch (err) {
      console.error('Error al obtener carrito:', err.message);
      res.status(500).json({ success: false, message: 'Error al obtener carrito' });
    }
  },

  /**
   * Agregar producto al carrito activo
   * POST /api/cart/items
   */
  async addItem(req, res) {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      if (!productId) {
        return res.status(400).json({ success: false, message: 'productId es requerido' });
      }

      const item = await cartModel.addItem({
        userId,
        productId: parseInt(productId),
        quantity: quantity ? parseInt(quantity) : 1
      });

      res.status(201).json({ success: true, message: 'Producto agregado al carrito', data: { item } });
    } catch (err) {
      console.error('Error al agregar al carrito:', err.message);
      res.status(500).json({ success: false, message: 'Error al agregar al carrito' });
    }
  },

  /**
   * Actualizar cantidad de un ítem en el carrito
   * PUT /api/cart/items/:id  (id = product_id)
   */
  async updateItem(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({ success: false, message: 'La cantidad debe ser al menos 1' });
      }

      const cart = await cartModel.getOrCreateActiveCart(userId);
      const item = await cartModel.updateItem(cart.id, parseInt(productId), parseInt(quantity));
      if (!item) {
        return res.status(404).json({ success: false, message: 'Ítem no encontrado en el carrito' });
      }

      res.json({ success: true, message: 'Carrito actualizado', data: { item } });
    } catch (err) {
      console.error('Error al actualizar carrito:', err.message);
      res.status(500).json({ success: false, message: 'Error al actualizar carrito' });
    }
  },

  /**
   * Eliminar un ítem del carrito
   * DELETE /api/cart/items/:id  (id = product_id)
   */
  async removeItem(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;

      const cart = await cartModel.getOrCreateActiveCart(userId);
      const item = await cartModel.removeItem(cart.id, parseInt(productId));
      if (!item) {
        return res.status(404).json({ success: false, message: 'Ítem no encontrado en el carrito' });
      }

      res.json({ success: true, message: 'Ítem eliminado del carrito' });
    } catch (err) {
      console.error('Error al eliminar del carrito:', err.message);
      res.status(500).json({ success: false, message: 'Error al eliminar del carrito' });
    }
  },

  /**
   * Marcar carrito como abandonado
   * DELETE /api/cart
   */
  async clear(req, res) {
    try {
      const userId = req.user.id;
      const cart = await cartModel.getOrCreateActiveCart(userId);
      await cartModel.updateStatus(cart.id, 'abandoned');
      res.json({ success: true, message: 'Carrito marcado como abandonado' });
    } catch (err) {
      console.error('Error al abandonar carrito:', err.message);
      res.status(500).json({ success: false, message: 'Error al abandonar carrito' });
    }
  },
};

module.exports = cartController;