
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function Carrito() {
  const {
    carrito,
    actualizarCantidad,
    eliminarProducto,
    total,
  } = useCart();

  const formatoPrecio = (precio) =>
    Number(precio).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });

  return (
    <section className="carrito">
      <h2>Mi carrito de compras</h2>

      {carrito.length === 0 ? (
        <div>
          <p>Tu carrito está vacío.</p>
          <Link to="/productos">Explorar productos</Link>
        </div>
      ) : (
        <>
          {carrito.map((item) => (
            <article key={item.id} className="carrito-item">
              <h3>{item.nombre}</h3>

              <p>Precio: {formatoPrecio(item.precio)}</p>

              <label htmlFor={`cantidad-${item.id}`}>
                Cantidad:
              </label>

              <input
                id={`cantidad-${item.id}`}
                type="number"
                min="1"
                max={item.stock}
                value={item.cantidad}
                onChange={(e) =>
                  actualizarCantidad(item.id, e.target.value)
                }
              />

              <p>
                Subtotal:{" "}
                {formatoPrecio(item.precio * item.cantidad)}
              </p>

              <button
                type="button"
                onClick={() => eliminarProducto(item.id)}
              >
                Eliminar
              </button>
            </article>
          ))}

          <h3>Total: {formatoPrecio(total)}</h3>

          <Link to="/checkout">Continuar al checkout</Link>
        </>
      )}
    </section>
  );
}

export default Carrito;
