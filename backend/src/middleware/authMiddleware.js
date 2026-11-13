const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación. Verifica el token JWT en el header Authorization.
 * Espera formato: Bearer <token>
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extraer "Bearer TOKEN" -> TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token de acceso requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token inválido o expirado' });
    }
    req.user = user; // { id, email, role }
    next();
  });
}

/**
 * Middleware de autorización: solo permite acceso si el usuario es admin.
 * Debe usarse DESPUÉS de authenticateToken.
 */
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Acceso denegado: se requiere rol de administrador' });
  }
  next();
}

module.exports = { authenticateToken, requireAdmin };