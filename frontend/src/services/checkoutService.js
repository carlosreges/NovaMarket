
import { apiRequest } from "./api";

export async function crearPedidoInvitado({
  carrito,
  cliente,
  metodoPago,
}) {
  if (!carrito.length) {
    throw new Error("El carrito está vacío.");
  }

  if (!cliente.name.trim() || !cliente.email.trim()) {
    throw new Error("Faltan datos del cliente.");
  }

  if (!metodoPago) {
    throw new Error("Seleccioná un método de pago.");
  }

  const pedido = {
    items: carrito.map((producto) => ({
      product_id: producto.id,
      quantity: producto.cantidad,
    })),

    customer: {
      name: cliente.name.trim(),
      email: cliente.email.trim(),
      phone: cliente.phone?.trim() || "",
    },

    payment_method: metodoPago,
  };

  return apiRequest("/api/checkout", {
    method: "POST",
    body: JSON.stringify(pedido),
  });
}
