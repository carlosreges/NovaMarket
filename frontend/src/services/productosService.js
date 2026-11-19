
import { apiRequest } from "./api";

// Obtener productos del catálogo
export async function obtenerProductos({ categoryId } = {}) {
  const params = new URLSearchParams();

  if (categoryId != null && categoryId !== "") {
    params.set("category", String(categoryId));
  }

  const query = params.toString();
  const endpoint = `/api/products${query ? `?${query}` : ""}`;

  const respuesta = await apiRequest(endpoint);

  if (!Array.isArray(respuesta?.data?.products)) {
    throw new Error("Formato de productos incorrecto");
  }

  return {
    items: respuesta.data.products,
  };
}

// Obtener categorías
export async function obtenerCategorias() {
  const respuesta = await apiRequest("/api/categories");

  if (!Array.isArray(respuesta?.data?.categories)) {
    throw new Error("Formato de categorías incorrecto");
  }

  return respuesta.data.categories;
}

 // Obtener detalle de un producto
export async function obtenerProductoPorId(id) {
  const respuesta = await apiRequest(
    `/api/products/${encodeURIComponent(id)}`
  );

  if (!respuesta?.data?.product) {
    throw new Error("No se pudo obtener el producto");
  }

  return respuesta.data.product;
}
