const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * POST /api/auth/register
 * Registro de nuevo usuario
 */
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  authController.register
);

/**
 * POST /api/auth/login
 * Inicio de sesión
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
  ],
  authController.login
);

/**
 * GET /api/auth/me
 * Datos del usuario autenticado (requiere token)
 */
router.get('/me', authenticateToken, authController.me);

/**
 * POST /api/auth/logout
 * Cierre de sesión (simulado)
 */
router.post('/logout', authenticateToken, authController.logout);

module.exports = router;