const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

/**
 * POST /api/admin/products
 * Crear producto (solo admin)
 */
router.post(
  '/products',
  authenticateToken,
  requireAdmin,
  [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('price').isFloat({ min: 0 }).withMessage('Precio inválido'),
    body('stock').isInt({ min: 0 }).withMessage('Stock inválido')
  ],
  productController.create
);

/**
 * PUT /api/admin/products/:id
 * Editar producto (solo admin)
 */
router.put(
  '/products/:id',
  authenticateToken,
  requireAdmin,
  param('id').isInt(),
  productController.update
);

/**
 * DELETE /api/admin/products/:id
 * Eliminar producto (solo admin)
 */
router.delete(
  '/products/:id',
  authenticateToken,
  requireAdmin,
  param('id').isInt(),
  productController.delete
);

/**
 * GET /api/admin/orders
 * Ver todos los pedidos (solo admin)
 */
router.get(
  '/orders',
  authenticateToken,
  requireAdmin,
  orderController.getAllOrders
);

/**
 * PUT /api/admin/orders/:id/status
 * Actualizar estado de una orden (solo admin)
 */
router.put(
  '/orders/:id/status',
  authenticateToken,
  requireAdmin,
  param('id').isInt(),
  body('status').isIn(['pending', 'completed', 'cancelled']).withMessage('Estado inválido'),
  orderController.updateStatus
);

module.exports = router;