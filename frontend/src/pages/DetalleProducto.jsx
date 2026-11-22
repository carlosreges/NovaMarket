
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
    (item) => String(item.id) === String(id)
  );

  const producto = USAR_API
    ? estadoApi.producto
    : productoDemo;

  const cargando = USAR_API && estadoApi.id !== id;
  const error = USAR_API ? estadoApi.error : "";

  if (cargando) {
    return (
      <section className="detalle-producto">
        <p role="status">Cargando producto...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="detalle-producto">
        <h1>Error al cargar el producto</h1>
        <p role="alert">{error}</p>

        <Link to="/productos" className="volver-catalogo">
          ← Volver al catálogo
        </Link>
      </section>
    );
  }

  if (!producto) {
    return (
      <section className="detalle-producto">
        <h1>Producto no encontrado</h1>

        <p>El producto solicitado no está disponible.</p>

        <Link to="/productos" className="volver-catalogo">
          ← Volver al catálogo
        </Link>
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

  const agregarAlCarrito = () => {
    if (!disponible) return;

    agregarProducto(producto);
  };

  return (
    <section
      className="detalle-producto"
      aria-labelledby="detalle-titulo"
    >
      <Link to="/productos" className="volver-catalogo">
        ← Volver al catálogo
      </Link>

      <div className="detalle-producto-card">
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

        <div className="detalle-producto-info">
          <span className="detalle-producto-categoria">
            {producto.categoria || "Tecnología"}
          </span>

          <h1 id="detalle-titulo">{producto.nombre}</h1>

          {producto.descripcion && (
            <p className="detalle-producto-descripcion">
              {producto.descripcion}
            </p>
          )}

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
            {disponible ? "Disponible" : "Sin stock"}
          </p>

          <button
            type="button"
            className="detalle-producto-boton"
            disabled={!disponible}
            onClick={agregarAlCarrito}
            aria-label={`Agregar ${producto.nombre} al carrito`}
          >
            {disponible
              ? "Agregar al carrito"
              : "Producto sin stock"}
          </button>

          <Link
            to="/carrito"
            className="detalle-producto-ver-carrito"
          >
            Ver mi carrito
          </Link>

          <p className="detalle-producto-demo">
            Catálogo de demostración. No se procesan
            compras reales.
          </p>
        </div>
      </div>
    </section>
  );
}

export default DetalleProducto;
