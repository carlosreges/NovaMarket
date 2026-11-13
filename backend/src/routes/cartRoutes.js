const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * GET /api/cart/items
 * Ver ítems del carrito activo del usuario (requiere auth)
 */
router.get('/items', authenticateToken, cartController.getItems);

/**
 * POST /api/cart/items
 * Agregar producto al carrito activo (requiere auth)
 */
router.post(
  '/items',
  authenticateToken,
  [
    body('productId').isInt().withMessage('ID de producto inválido'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('Cantidad inválida')
  ],
  cartController.addItem
);

/**
 * PUT /api/cart/items/:id
 * Modificar cantidad de un ítem (id = product_id, requiere auth)
 */
router.put(
  '/items/:id',
  authenticateToken,
  param('id').isInt().withMessage('ID de producto inválido'),
  body('quantity').isInt({ min: 1 }).withMessage('Cantidad inválida'),
  cartController.updateItem
);

/**
 * DELETE /api/cart/items/:id
 * Quitar un ítem del carrito (id = product_id, requiere auth)
 */
router.delete(
  '/items/:id',
  authenticateToken,
  param('id').isInt().withMessage('ID de producto inválido'),
  cartController.removeItem
);

/**
 * DELETE /api/cart
 * Marcar carrito como abandonado (requiere auth)
 */
router.delete('/', authenticateToken, cartController.clear);

module.exports = router;