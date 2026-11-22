
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
        <div className="carrito-vacio">
          <div
            className="carrito-vacio__icono"
            aria-hidden="true"
          >
            🛒
          </div>

          <h3>Tu carrito está vacío</h3>

          <p>
            Todavía no agregaste productos.
            Explorá nuestro catálogo y encontrá
            lo que necesitás.
          </p>

          <Link to="/productos" className="carrito-boton">
            Explorar productos
          </Link>

          <p className="carrito-vacio__nota">
            Versión de demostración de NovaMarket.
          </p>
        </div>
      ) : (
        <div className="carrito-contenido">
          <div className="carrito-productos">
            {carrito.map((item) => {
              const cantidad = Number(item.cantidad) || 1;
              const stock = Number(item.stock);

              return (
                <article
                  key={item.id}
                  className="carrito-item"
                >
                  {item.imagen && (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="carrito-imagen"
                    />
                  )}

                  <div className="carrito-item-info">
                    <h3>{item.nombre}</h3>

                    <p>
                      Precio: {formatoPrecio(item.precio)}
                    </p>

                    <div className="carrito-cantidad">
                      <label htmlFor={`cantidad-${item.id}`}>
                        Cantidad:
                      </label>

                      <div className="cantidad-controles">
                        <button
                          type="button"
                          disabled={cantidad <= 1}
                          aria-label={`Disminuir cantidad de ${item.nombre}`}
                          onClick={() =>
                            actualizarCantidad(
                              item.id,
                              cantidad - 1
                            )
                          }
                        >
                          −
                        </button>

                        <input
                          id={`cantidad-${item.id}`}
                          type="number"
                          min="1"
                          max={item.stock}
                          value={item.cantidad}
                          onChange={(e) =>
                            actualizarCantidad(
                              item.id,
                              e.target.value
                            )
                          }
                        />

                        <button
                          type="button"
                          disabled={
                            Number.isFinite(stock) &&
                            cantidad >= stock
                          }
                          aria-label={`Aumentar cantidad de ${item.nombre}`}
                          onClick={() =>
                            actualizarCantidad(
                              item.id,
                              cantidad + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <p className="carrito-subtotal">
                      Subtotal:{" "}
                      {formatoPrecio(
                        item.precio * cantidad
                      )}
                    </p>

                    <button
                      type="button"
                      className="carrito-eliminar"
                      onClick={() =>
                        eliminarProducto(item.id)
                      }
                    >
                      Eliminar producto
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="carrito-resumen">
            <h3>Resumen de compra</h3>

            <div className="carrito-total">
              <span>Total</span>
              <strong>{formatoPrecio(total)}</strong>
            </div>

            <Link
              to="/checkout"
              className="carrito-boton"
            >
              Continuar al checkout
            </Link>

            <Link
              to="/productos"
              className="carrito-seguir"
            >
              Seguir explorando productos
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Carrito;
