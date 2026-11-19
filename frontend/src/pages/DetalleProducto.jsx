
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productosDemo } from "../data/productosDemo";
import { useCart } from "../context/useCart";

import {
  obtenerProductoPorId,
  obtenerCategorias,
} from "../services/productosService";

import { adaptarProducto } from "../services/productosAdapter";

const USAR_API = import.meta.env.VITE_USAR_API === "true";

function DetalleProducto() {
  const { id } = useParams();
  const { agregarProducto } = useCart();

  const [estadoApi, setEstadoApi] = useState({
    id: null,
    producto: null,
    error: "",
  });

  useEffect(() => {
    if (!USAR_API) return;

    let activo = true;

    async function cargarDetalle() {
      try {
        const [respuestaProducto, categorias] =
          await Promise.all([
            obtenerProductoPorId(id),
            obtenerCategorias(),
          ]);

        if (!activo) return;

        const productoAdaptado = adaptarProducto(
          respuestaProducto,
          categorias
        );

        setEstadoApi({
          id,
          producto: productoAdaptado,
          error: "",
        });
      } catch (error) {
        if (activo) {
          setEstadoApi({
            id,
            producto: null,
            error: error.message,
          });
        }
      }
    }

    cargarDetalle();

    return () => {
      activo = false;
    };
  }, [id]);

  const productoDemo = productosDemo.find(
    (item) => String(item.id) === id
  );

  const producto = USAR_API
    ? estadoApi.producto
    : productoDemo;

  const cargando = USAR_API && estadoApi.id !== id;
  const error = USAR_API ? estadoApi.error : "";

  if (cargando) {
    return <p role="status">Cargando producto...</p>;
  }

  if (error) {
    return (
      <section className="detalle-producto">
        <h2>Error al cargar el producto</h2>
        <p role="alert">{error}</p>
        <Link to="/productos">Volver al catálogo</Link>
      </section>
    );
  }

  if (!producto) {
    return (
      <section className="detalle-producto">
        <h2>Producto no encontrado</h2>
        <p>El producto solicitado no está disponible.</p>
        <Link to="/productos">Volver al catálogo</Link>
      </section>
    );
  }

  const disponible = Number(producto.stock) > 0;

  const precioFormateado = Number(
    producto.precio
  ).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <section className="detalle-producto">
      <Link to="/productos" className="volver-catalogo">
        ← Volver al catálogo
      </Link>

      <h2>{producto.nombre}</h2>
<div className="detalle-producto-visual">
  {producto.imagen ? (
    <img
      src={producto.imagen}
      alt={producto.nombre}
      className="detalle-producto-imagen"
    />
  ) : (
    <div
      className="detalle-producto-placeholder"
      role="img"
      aria-label={`Imagen de ${producto.nombre} pendiente`}
    >
      <span aria-hidden="true">📦</span>
      <p>Imagen próximamente</p>
    </div>
  )}
</div>

      {producto.descripcion && (
        <p>{producto.descripcion}</p>
      )}

      <p>
        <strong>Categoría:</strong> {producto.categoria}
      </p>

      <p className="detalle-producto-precio">
        <strong>{precioFormateado}</strong>
      </p>

      <p
        className={
          disponible
            ? "producto-disponible"
            : "producto-sin-stock"
        }
      >
        {disponible
          ? "Disponible"
          : "Sin stock"}
      </p>

      <button
        type="button"
        className="detalle-producto-boton"
        disabled={!disponible}
        onClick={() => agregarProducto(producto)}
        aria-label={`Agregar ${producto.nombre} al carro`}
      >
        Agregar al carro
      </button>
    </section>
  );
}

export default DetalleProducto;
