const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const checkoutController = require('../controllers/checkoutController');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * POST /api/checkout
 * Confirma el pedido (simulado, sin pago real) - requiere auth
 */
router.post(
  '/',
  authenticateToken,
  [
    body('items').isArray({ min: 1 }).withMessage('Se requiere al menos un ítem'),
    body('total').isFloat({ min: 0 }).withMessage('Total inválido')
  ],
  checkoutController.create
);

module.exports = router;