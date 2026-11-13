const orderController = require('./orderController');

/**
 * Checkout simulado - confirma el pedido sin pago real
 * POST /api/checkout
 * Delegada en orderController.create pero expuesta como endpoint propio de checkout
 */
const checkoutController = {
  async create(req, res) {
    return orderController.create(req, res);
  },
};

module.exports = checkoutController;