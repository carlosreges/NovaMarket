
# NovaMarket - Componentes Frontend

## Semana 2 - Propuesta inicial

Los componentes serán reutilizables y se ajustarán
según los diseños aprobados de UX/UI.

### Navbar
Función: mostrar la navegación principal.

Props propuestas:
- usuario
- cantidadCarrito

### ProductCard
Función: mostrar un producto del catálogo.

Props propuestas:
- producto
- onAgregarCarrito

### CategoryFilter
Función: filtrar productos por categoría.

Props propuestas:
- categorias
- categoriaSeleccionada
- onCambiarCategoria

### CartItem
Función: mostrar un producto del carrito.

Props propuestas:
- item
- onActualizarCantidad
- onEliminar

### Button
Función: reutilizar botones en diferentes vistas.

Props propuestas:
- children
- onClick
- disabled
- variant

### LoadingSpinner
Función: indicar que se está cargando información.

### EmptyState
Función: mostrar mensajes cuando no existen resultados.

Props propuestas:
- mensaje
- accion

## Pendientes de validación

- Confirmar componentes con UX/UI.
- Revisar propiedades según Figma.
- Acordar estructura de datos con Backend.
- Definir estados de carga, error y éxito.
