
import { Link } from "react-router-dom";

function ProductCard({ producto, onAgregarCarrito }) {
  const precio = Number(producto.precio);
  const disponible = Number(producto.stock) > 0;

  const precioFormateado = precio.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <article className="product-card">
      <div className="product-card__imagen">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            loading="lazy"
          />
        ) : (
          <div className="product-card__sin-imagen">
            <span aria-hidden="true">▣</span>
            <span>Imagen próximamente</span>
          </div>
        )}
      </div>

      <div className="product-card__informacion">
        <h3>{producto.nombre}</h3>

        {producto.descripcion && (
          <p>{producto.descripcion}</p>
        )}

        <p className="product-card-precio">
          <strong>{precioFormateado}</strong>
        </p>

        <p
          className={
            disponible
              ? "producto-disponible"
              : "producto-sin-stock"
          }
        >
          {disponible ? "Disponible" : "Sin stock"}
        </p>
      </div>

      <div className="product-card-actions">
        <Link
          to={`/productos/${producto.id}`}
          className="ver-detalle"
        >
          Ver detalles
        </Link>

        <button
          type="button"
          disabled={!disponible}
          onClick={() => onAgregarCarrito?.(producto)}
          aria-label={`Agregar ${producto.nombre} al carrito`}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
