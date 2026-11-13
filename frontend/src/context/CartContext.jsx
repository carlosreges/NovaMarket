
import { useEffect, useState } from "react";
import { CartContext } from "./cartContextBase";

export function CartProvider({ children }) {
 
const [carrito, setCarrito] = useState(() => {
  try {
    const carritoGuardado = localStorage.getItem(
      "novamarket-carrito"
    );

    if (!carritoGuardado) return [];

    const datos = JSON.parse(carritoGuardado);

    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error("Error al cargar el carrito:", error);
    return [];
  }
});


useEffect(() => {
  localStorage.setItem(
    "novamarket-carrito",
    JSON.stringify(carrito)
  );
}, [carrito]);

  const agregarProducto = (producto) => {
    if (!producto || producto.stock <= 0) return;

    setCarrito((actual) => {
      const existente = actual.find(
        (item) => item.id === producto.id
      );

      if (existente) {
        if (existente.cantidad >= producto.stock) {
          return actual;
        }

        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...actual, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarProducto = (id) => {
    setCarrito((actual) =>
      actual.filter((item) => item.id !== id)
    );
  };

  const actualizarCantidad = (id, cantidad) => {
    setCarrito((actual) =>
      actual.map((item) => {
        if (item.id !== id) return item;

        const nuevaCantidad = Math.max(
          1,
          Math.min(Number(cantidad) || 1, item.stock)
        );

        return { ...item, cantidad: nuevaCantidad };
      })
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce(
    (acumulado, item) =>
      acumulado + item.precio * item.cantidad,
    0
  );

  const cantidadTotal = carrito.reduce(
    (acumulado, item) => acumulado + item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        actualizarCantidad,
        vaciarCarrito,
        total,
        cantidadTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
