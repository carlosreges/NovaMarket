const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const orderController = require('../controllers/orderController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

/**
 * POST /api/orders
 * Crear orden desde carrito (requiere auth)
 */
router.post(
  '/',
  authenticateToken,
  [
    body('items').isArray({ min: 1 }).withMessage('Se requiere al menos un ítem'),
    body('total').isFloat({ min: 0 }).withMessage('Total inválido')
  ],
  orderController.create
);

/**
 * GET /api/orders
 * Ver mis órdenes (requiere auth)
 */
router.get('/', authenticateToken, orderController.getMyOrders);

/**
 * GET /api/orders/:id
 * Ver detalle de una orden (requiere auth)
 */
router.get(
  '/:id',
  authenticateToken,
  param('id').isInt(),
  orderController.getById
);

/**
 * GET /api/admin/orders
 * Admin: ver todas las órdenes (requiere auth + admin)
 * Montado en app.js bajo /api/admin
 */
router.get(
  '/orders',
  authenticateToken,
  requireAdmin,
  orderController.getAllOrders
);

/**
 * PUT /api/orders/:id/status
 * Admin: actualizar estado de orden (requiere auth + admin)
 */
router.put(
  '/:id/status',
  authenticateToken,
  requireAdmin,
  param('id').isInt(),
  body('status').isIn(['pending', 'completed', 'cancelled']).withMessage('Estado inválido'),
  orderController.updateStatus
);

module.exports = router;