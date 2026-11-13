
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { productosDemo } from "../data/productosDemo";
import { useCart } from "../context/useCart";

import {
  obtenerProductos,
  obtenerCategorias,
} from "../services/productosService";

import {
  adaptarProductos,
} from "../services/productosAdapter";

// La API queda desactivada hasta que Backend esté disponible.
const USAR_API = import.meta.env.VITE_USAR_API === "true";

function Productos() {
  const { agregarProducto } = useCart();

  const [productos, setProductos] = useState(
    USAR_API ? [] : productosDemo
  );

  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  const [categorias, setCategorias] = useState([
    "Todas",
    "Periféricos",
    "Accesorios",
    "Gadgets",
  ]);

  const [cargando, setCargando] = useState(USAR_API);
  const [error, setError] = useState("");

  // Preparado para cargar productos reales desde Backend.
  useEffect(() => {
    if (!USAR_API) return;

    let activo = true;

    async function cargarCatalogo() {
      try {
        const [respuestaProductos, respuestaCategorias] =
          await Promise.all([
            obtenerProductos(),
            obtenerCategorias(),
          ]);

        if (!activo) return;

        if (
          !Array.isArray(respuestaProductos?.items) ||
          !Array.isArray(respuestaCategorias)
        ) {
          throw new Error("Formato de respuesta incorrecto");
        }

        const productosAdaptados = adaptarProductos(
          respuestaProductos.items,
          respuestaCategorias
        );

        setProductos(productosAdaptados);

        setCategorias([
          "Todas",
          ...new Set(
            respuestaCategorias.map((cat) => cat.name)
          ),
        ]);
      } catch (err) {
        if (activo) {
          setError(
            err.message || "No se pudo cargar el catálogo"
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarCatalogo();

    return () => {
      activo = false;
    };
  }, []);

  // Buscador y filtros.
  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoria === "Todas" ||
      producto.categoria === categoria;

    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  const handleAgregarCarrito = (producto) => {
    agregarProducto(producto);
  };

  return (
    <section className="productos">
      <h2>Catálogo de productos</h2>

      <p>
        Explorá nuestros accesorios, periféricos y gadgets.
      </p>

      <div className="buscador">
        <label htmlFor="buscar-producto">
          Buscar productos
        </label>

        <input
          id="buscar-producto"
          type="search"
          placeholder="Ej.: teclado, mouse..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="filtros">
        <label htmlFor="categoria">
          Filtrar por categoría:
        </label>

        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {cargando ? (
        <p role="status">Cargando productos...</p>
      ) : error ? (
        <p role="alert" className="sin-resultados">
          Error: {error}
        </p>
      ) : productosFiltrados.length === 0 ? (
        <p className="sin-resultados">
          No se encontraron productos con los filtros
          seleccionados.
        </p>
      ) : (
        <div className="productos-grid">
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onAgregarCarrito={handleAgregarCarrito}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Productos;
