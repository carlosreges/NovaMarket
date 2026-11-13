
export function adaptarProducto(producto, categorias = []) {
  const categoriaEncontrada = categorias.find(
    (categoria) => categoria.id === producto.category_id
  );

  return {
    id: producto.id,
    nombre: producto.name,
    descripcion: producto.description || "",
    categoria: categoriaEncontrada?.name || "Sin categoría",
    categoriaId: producto.category_id,
    precio: Number(producto.price),
    stock: Number(producto.stock),
    imagen: "",
    color: producto.color || "",
    marca: producto.brand || "",
  };
}

export function adaptarProductos(productos, categorias = []) {
  return productos.map((producto) =>
    adaptarProducto(producto, categorias)
  );
}
