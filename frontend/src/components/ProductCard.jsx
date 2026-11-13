
import { Link } from "react-router-dom";

function ProductCard({ producto, onAgregarCarrito }) {
  const precio = Number(producto.precio);
  const disponible = producto.stock > 0;

  return (
    <article className="product-card">
      {producto.imagen && (
        <img
          src={producto.imagen}
          alt={producto.nombre}
        />
      )}

      <h3>{producto.nombre}</h3>

      <p>{producto.descripcion}</p>

      <p>
        <strong>
          {precio.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </strong>
      </p>

      <p>
        {disponible ? "Disponible" : "Sin stock"}
      </p>

      <div className="product-card-actions">
        <Link
          to={`/productos/${producto.id}`}
          className="ver-detalle"
        >
          Ver detalle
        </Link>

        <button
          type="button"
          disabled={!disponible}
          onClick={() => onAgregarCarrito?.(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
