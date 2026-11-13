const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const authController = {
  /**
   * Registro de nuevo usuario
   * POST /api/auth/register
   */
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Nombre, email y contraseña son requeridos' });
      }

      if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' });
      }

      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'El email ya está registrado' });
      }

      const user = await userModel.create({ name, email, password, role: 'customer' });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(201).json({
        success: true,
        message: 'Usuario registrado correctamente',
        data: {
          user: { id: user.id, name: user.name, email: user.email, role: user.role },
          token
        }
      });
    } catch (err) {
      console.error('Error en registro:', err.message);
      res.status(500).json({ success: false, message: 'Error al registrar usuario' });
    }
  },

  /**
   * Login de usuario
   * POST /api/auth/login
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email y contraseña son requeridos' });
      }

      const user = await userModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
      }

      const isValid = await userModel.comparePassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.json({
        success: true,
        message: 'Login exitoso',
        data: {
          user: { id: user.id, name: user.name, email: user.email, role: user.role },
          token
        }
      });
    } catch (err) {
      console.error('Error en login:', err.message);
      res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
    }
  },

  /**
   * Obtener datos del usuario autenticado
   * GET /api/auth/me
   */
  async me(req, res) {
    try {
      const user = await userModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
      res.json({ success: true, data: { user } });
    } catch (err) {
      console.error('Error en /me:', err.message);
      res.status(500).json({ success: false, message: 'Error al obtener usuario' });
    }
  },

  /**
   * Cierre de sesión (simulado - en JWT stateless el cliente solo debe eliminar el token)
   * POST /api/auth/logout
   */
  async logout(req, res) {
    try {
      res.json({ success: true, message: 'Sesión cerrada. Elimine el token del cliente.' });
    } catch (err) {
      console.error('Error en logout:', err.message);
      res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
    }
  },
};

module.exports = authController;