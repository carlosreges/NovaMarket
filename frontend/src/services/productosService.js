
import { apiRequest } from "./api";

// Obtener productos del catálogo
export async function obtenerProductos({
  categoryId,
  page = 1,
  limit = 20,
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (categoryId) {
    params.set("category_id", categoryId);
  }

  return apiRequest(`/api/products?${params.toString()}`);
}

// Obtener categorías
export async function obtenerCategorias() {
  return apiRequest("/api/categories");
}

// Obtener el detalle de un producto
export async function obtenerProductoPorId(id) {
  return apiRequest(
    `/api/products/${encodeURIComponent(id)}`
  );
}
