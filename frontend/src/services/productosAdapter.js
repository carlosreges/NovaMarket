export function adaptarProducto(producto, categorias = []) {
    const categoriaEncontrada = categorias.find(
        (categoria) =>
        Number(categoria.id) === Number(producto.category_id)
    );

    const nombreCategoria =
        producto.category_name ||
        (categoriaEncontrada && categoriaEncontrada.name) ||
        "Sin categoría";

    return {
        id: producto.id,
        nombre: producto.name,
        descripcion: producto.description || "",
        categoria: nombreCategoria,
        categoriaId: producto.category_id,
        precio: Number(producto.price),
        stock: Number(producto.stock),
        imagen: producto.image_url || "",
        color: producto.color || "",
        marca: producto.brand || "",
    };
}

export function adaptarProductos(productos, categorias = []) {
    return productos.map((producto) =>
        adaptarProducto(producto, categorias)
    );
}