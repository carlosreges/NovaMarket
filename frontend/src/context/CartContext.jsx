
import { useEffect, useRef, useState } from "react";
import { CartContext } from "./cartContextBase";
import { registrarEvento } from "../services/trackingService";

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

  const carritoRef = useRef(carrito);

  useEffect(() => {
    carritoRef.current = carrito;

    localStorage.setItem(
      "novamarket-carrito",
      JSON.stringify(carrito)
    );
  }, [carrito]);

  // Mantiene actualizado el estado y la referencia
  // para evitar operaciones con cantidades anteriores.
  const actualizarCarrito = (transformar) => {
    const actual = carritoRef.current;
    const siguiente = transformar(actual);

    if (siguiente === actual) return false;

    carritoRef.current = siguiente;
    setCarrito(siguiente);

    return true;
  };

  const agregarProducto = (producto) => {
    if (!producto) return;

    const stock = Number(producto.stock);
    const precio = Number(producto.precio);

    if (
      !Number.isFinite(stock) ||
      stock <= 0 ||
      !Number.isFinite(precio)
    ) {
      return;
    }

    const agregado = actualizarCarrito((actual) => {
      const existente = actual.find(
        (item) => item.id === producto.id
      );

      if (existente) {
        if (Number(existente.cantidad) >= stock) {
          return actual;
        }

        return actual.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: Number(item.cantidad) + 1,
              }
            : item
        );
      }

      return [
        ...actual,
        {
          ...producto,
          cantidad: 1,
        },
      ];
    });

    // Solo se registra si realmente se agregó
    // una unidad al carrito.
    if (agregado) {
      registrarEvento("add_to_cart", {
        item_id: producto.codigo ?? String(producto.id),
        price: precio,
        quantity: 1,
        value: precio,
        currency: "ARS",
      });
    }
  };

const eliminarProducto = (id) => {
  const producto = carritoRef.current.find(
    (item) => item.id === id
  );

  if (!producto) return;

  const eliminado = actualizarCarrito((actual) =>
    actual.filter((item) => item.id !== id)
  );

  if (eliminado) {
    registrarEvento("remove_from_cart", {
      item_id: producto.codigo ?? String(producto.id),
      price: Number(producto.precio),
      quantity: Number(producto.cantidad),
      currency: "ARS",
    });
  }
};
const actualizarCantidad = (id, cantidad) => {
    actualizarCarrito((actual) => {
      const existente = actual.find(
        (item) => item.id === id
      );

      if (!existente) return actual;

      const stock = Number(existente.stock);

      if (!Number.isFinite(stock) || stock < 1) {
        return actual;
      }

      const nuevaCantidad = Math.max(
        1,
        Math.min(Number(cantidad) || 1, stock)
      );

      if (Number(existente.cantidad) === nuevaCantidad) {
        return actual;
      }

      return actual.map((item) =>
        item.id === id
          ? { ...item, cantidad: nuevaCantidad }
          : item
      );
    });
  };

  const vaciarCarrito = () => {
    actualizarCarrito((actual) =>
      actual.length === 0 ? actual : []
    );
  };

  const total = carrito.reduce(
    (acumulado, item) =>
      acumulado +
      Number(item.precio) * Number(item.cantidad),
    0
  );

  const cantidadTotal = carrito.reduce(
    (acumulado, item) =>
      acumulado + Number(item.cantidad),
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
