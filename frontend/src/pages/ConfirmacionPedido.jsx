
import { Link, useLocation } from "react-router-dom";

function ConfirmacionPedido() {
  const location = useLocation();
  const pedido = location.state?.pedido;

  // Todavía no hay pedido si Backend no respondió.
  if (!pedido?.id || !pedido?.tracking_code) {
    return (
      <section className="confirmacion-pedido">
        <h2>Confirmación de pedido</h2>

        <p>
          Todavía no hay ningún pedido confirmado.
        </p>

        <Link to="/productos">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  const totalFormateado = Number(
    pedido.total
  ).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <section className="confirmacion-pedido">
      <h2>¡Pedido simulado confirmado!</h2>

      <p>
        Tu pedido se registró correctamente.
        No se realizó ningún cobro real.
      </p>

      <p>
        <strong>Número de pedido:</strong>{" "}
        {pedido.id}
      </p>

      <p>
        <strong>Código de seguimiento:</strong>{" "}
        {pedido.tracking_code}
      </p>

      <p>
        Guardá tu código de seguimiento para
        consultar el estado del pedido.
      </p>

      <h3>Total del pedido: {totalFormateado}</h3>

      <p>
        Estado: {pedido.status}
      </p>

      <Link to="/productos">
        Volver al catálogo
      </Link>
    </section>
  );
}

export default ConfirmacionPedido;
