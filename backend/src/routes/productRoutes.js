const express = require('express');
const router = express.Router();
const { param } = require('express-validator');
const productController = require('../controllers/productController');

/**
 * GET /api/products
 * Listar productos (público, filtro opcional por ?category=ID)
 */
router.get('/', productController.getAll);

/**
 * GET /api/products/:id
 * Obtener producto por ID (público)
 */
router.get('/:id', param('id').isInt(), productController.getById);

/**
 * Las rutas de creación/edición/eliminación de productos (admin)
 * están montadas bajo /api/admin/products en adminRoutes.js
 */

module.exports = router;