const orderModel = require('../models/orderModel');

const orderController = {
  /**
   * Crear orden desde el carrito del usuario
   * POST /api/orders
   */
  async create(req, res) {
    try {
      const userId = req.user.id;
      const { items, total, discount, payment_method } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: 'La orden debe tener al menos un ítem' });
      }

      if (!total || total <= 0) {
        return res.status(400).json({ success: false, message: 'Total inválido' });
      }

      const order = await orderModel.create({ userId, total, items, discount, payment_method });

      // Obtener ítems de la orden creada para devolverlos
      const orderItems = await orderModel.getItems(order.id);

      res.status(201).json({
        success: true,
        message: 'Orden creada exitosamente',
        data: { order: { ...order, items: orderItems } }
      });
    } catch (err) {
      console.error('Error al crear orden:', err.message);
      res.status(500).json({ success: false, message: 'Error al crear orden' });
    }
  },

  /**
   * Ver órdenes del usuario autenticado
   * GET /api/orders
   */
  async getMyOrders(req, res) {
    try {
      const userId = req.user.id;
      const orders = await orderModel.getAllForUser(userId);
      res.json({ success: true, data: { orders } });
    } catch (err) {
      console.error('Error al obtener órdenes:', err.message);
      res.status(500).json({ success: false, message: 'Error al obtener órdenes' });
    }
  },

  /**
   * Ver detalle de una orden
   * GET /api/orders/:id
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const isAdmin = req.user.role === 'admin';
      const order = await orderModel.getById(parseInt(id), req.user.id, isAdmin);

      if (!order) {
        return res.status(404).json({ success: false, message: 'Orden no encontrada' });
      }

      const items = await orderModel.getItems(order.id);

      res.json({
        success: true,
        data: { order: { ...order, items } }
      });
    } catch (err) {
      console.error('Error al obtener orden:', err.message);
      res.status(500).json({ success: false, message: 'Error al obtener orden' });
    }
  },

  /**
   * Admin: ver todas las órdenes
   * GET /api/admin/orders
   */
  async getAllOrders(req, res) {
    try {
      const orders = await orderModel.getAll();
      res.json({ success: true, data: { orders } });
    } catch (err) {
      console.error('Error al obtener todas las órdenes:', err.message);
      res.status(500).json({ success: false, message: 'Error al obtener órdenes' });
    }
  },

  /**
   * Admin: actualizar estado de una orden
   * PUT /api/orders/:id/status
   */
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['pending', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Estado inválido' });
      }

      const order = await orderModel.updateStatus(parseInt(id), status);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Orden no encontrada' });
      }

      res.json({ success: true, message: 'Estado de orden actualizado', data: { order } });
    } catch (err) {
      console.error('Error al actualizar estado:', err.message);
      res.status(500).json({ success: false, message: 'Error al actualizar estado de orden' });
    }
  },
};

module.exports = orderController;