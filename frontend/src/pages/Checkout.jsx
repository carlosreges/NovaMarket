
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { registrarEvento } from "../services/trackingService";

function Checkout() {
  const { carrito, total } = useCart();

  const [cliente, setCliente] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [datosValidados, setDatosValidados] = useState(false);

  const eventoRegistrado = useRef(false);

  // Tracking: registrar el inicio del Checkout una sola vez
  // por montaje del componente.
  useEffect(() => {
    if (eventoRegistrado.current || carrito.length === 0) {
      return;
    }

    eventoRegistrado.current = true;

    registrarEvento("begin_checkout", {
      value: Number(total),
      currency: "ARS",
      items: carrito.map((producto) => ({
        item_id: producto.codigo ?? String(producto.id),
        item_name: producto.nombre,
        price: Number(producto.precio),
        quantity: Number(producto.cantidad),
      })),
    });
  }, [carrito, total]);

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

    setErrores((anterior) => ({
      ...anterior,
      [name]: "",
    }));

    setErrorGeneral("");
    setDatosValidados(false);
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    const nombre = cliente.name.trim();
    const email = cliente.email.trim();
    const telefono = cliente.phone.trim();

    if (!nombre) {
      nuevosErrores.name = "Ingresá tu nombre completo.";
    } else if (nombre.length < 3) {
      nuevosErrores.name =
        "El nombre debe tener al menos 3 caracteres.";
    }

    if (!email) {
      nuevosErrores.email = "Ingresá tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nuevosErrores.email =
        "Ingresá un correo electrónico válido.";
    }

    if (telefono) {
      const digitos = telefono.replace(/\D/g, "");
      const caracteresValidos = /^[+\d\s()-]+$/.test(telefono);

      if (
        !caracteresValidos ||
        digitos.length < 7 ||
        digitos.length > 15
      ) {
        nuevosErrores.phone =
          "Ingresá un teléfono válido de 7 a 15 dígitos.";
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorGeneral("");
    setDatosValidados(false);

    if (carrito.length === 0) {
      setErrorGeneral(
        "No podés continuar con el carrito vacío."
      );
      return;
    }

    const stockInsuficiente = carrito.some((producto) => {
      const stock = Number(producto.stock);
      const cantidad = Number(producto.cantidad);

      return (
        !Number.isFinite(stock) ||
        !Number.isInteger(cantidad) ||
        stock <= 0 ||
        cantidad > stock ||
        cantidad < 1
      );
    });

    if (stockInsuficiente) {
      setErrorGeneral(
        "Uno o más productos no tienen stock suficiente."
      );
      return;
    }

    if (!validarFormulario()) return;

    // Simulación: NO se envía el pedido al Backend.
    // NO se registra el evento purchase.
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
            Los precios y el stock deberán ser
            validados por el Backend antes de
            realizar pedidos reales.
          </p>

          <h3>Datos del cliente</h3>

          <form onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name">
                Nombre completo *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={cliente.name}
                onChange={handleChange}
                placeholder="Ej.: Ana Pérez"
                autoComplete="name"
                required
                aria-invalid={Boolean(errores.name)}
                aria-describedby={
                  errores.name ? "name-error" : undefined
                }
              />

              {errores.name && (
                <p
                  id="name-error"
                  className="mensaje-error"
                  role="alert"
                >
                  {errores.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email">
                Correo electrónico *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={cliente.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                autoComplete="email"
                required
                aria-invalid={Boolean(errores.email)}
                aria-describedby={
                  errores.email ? "email-error" : undefined
                }
              />

              {errores.email && (
                <p
                  id="email-error"
                  className="mensaje-error"
                  role="alert"
                >
                  {errores.email}
                </p>
              )}
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
                placeholder="Ej.: 11 1234-5678"
                autoComplete="tel"
                aria-invalid={Boolean(errores.phone)}
                aria-describedby={
                  errores.phone ? "phone-error" : undefined
                }
              />

              {errores.phone && (
                <p
                  id="phone-error"
                  className="mensaje-error"
                  role="alert"
                >
                  {errores.phone}
                </p>
              )}
            </div>

            <p>* Campos obligatorios</p>

            <button type="submit">
              Validar datos
            </button>
          </form>

          {errorGeneral && (
            <p role="alert" className="mensaje-error">
              {errorGeneral}
            </p>
          )}

          {datosValidados && (
            <p role="status">
              ✅ Datos validados correctamente.
              El pedido todavía no fue enviado
              al Backend.
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
