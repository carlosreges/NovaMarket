
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function Checkout() {
  const { carrito, total } = useCart();

  const [cliente, setCliente] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [datosValidados, setDatosValidados] =
    useState(false);

    const [error, setError] = useState("");

  const formatoPrecio = (precio) =>
    Number(precio).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCliente((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setDatosValidados(false);
  };

 
const handleSubmit = (e) => {
  e.preventDefault();

  setError("");
  setDatosValidados(false);

  if (carrito.length === 0) {
    setError("No podés continuar con el carrito vacío.");
    return;
  }

  const stockInsuficiente = carrito.some(
    (producto) =>
      producto.stock <= 0 ||
      producto.cantidad > producto.stock ||
      producto.cantidad < 1
  );

  if (stockInsuficiente) {
    setError(
      "Uno o más productos no tienen stock suficiente."
    );
    return;
  }

  if (!cliente.name.trim() || !cliente.email.trim()) {
    setError("Completá los datos obligatorios.");
    return;
  }

  // Todavía no enviamos el pedido a Backend.
  setDatosValidados(true);
};

  return (
    <section className="checkout">
      <h2>Checkout como invitado</h2>

      <p>
        Esta compra es simulada. No se realizará
        ningún cobro real.
      </p>

      {carrito.length === 0 ? (
        <div>
          <p>Tu carrito está vacío.</p>
          <Link to="/productos">
            Volver al catálogo
          </Link>
        </div>
      ) : (
        <>
          <h3>Resumen del pedido</h3>

          {carrito.map((producto) => (
            <article key={producto.id}>
              <p>
                {producto.nombre} — Cantidad:{" "}
                {producto.cantidad}
              </p>

              <p>
                Subtotal estimado:{" "}
                {formatoPrecio(
                  producto.precio * producto.cantidad
                )}
              </p>
            </article>
          ))}

          <h3>
            Total estimado: {formatoPrecio(total)}
          </h3>

          <p>
            Backend validará los precios y el stock
            al confirmar el pedido.
          </p>

          <h3>Datos del cliente</h3>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">
                Nombre completo
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={cliente.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label htmlFor="email">
                Correo electrónico
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={cliente.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="phone">
                Teléfono (opcional)
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={cliente.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>

            <button type="submit">
              Validar datos
            </button>
          </form>

{error && (
  <p role="alert" className="mensaje-error">
    {error}
  </p>
)}
          {datosValidados && (
            <p role="status">
              Datos completos. El pedido todavía
              no fue enviado a Backend.
            </p>
          )}

          <Link to="/carrito">
            Volver al carrito
          </Link>
        </>
      )}
    </section>
  );
}

export default Checkout;
