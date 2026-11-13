const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

/**
 * GET /api/categories
 * Listar categorías (público)
 */
router.get('/', categoryController.getAll);

/**
 * POST /api/categories
 * Crear categoría (solo admin)
 */
router.post(
  '/',
  authenticateToken,
  requireAdmin,
  [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('slug').notEmpty().withMessage('El slug es requerido')
  ],
  categoryController.create
);

module.exports = router;