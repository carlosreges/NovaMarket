
# NovaMarket - Gestión de estado global

## Frontend - Semana 2

Propuesta inicial para gestionar el estado compartido
de la aplicación mediante React Context API.

## 1. AuthContext

Responsabilidad:
Administrar la autenticación y los roles.

Estados propuestos:
- usuario
- autenticado
- cargando
- error

Funciones propuestas:
- login()
- registrar()
- logout()
- verificarSesion()

Roles:
- CLIENTE
- ADMIN

Consideraciones:
- Proteger las rutas administrativas.
- Restaurar la sesión de forma segura.
- Gestionar errores y sesiones expiradas.
- Coordinar la autenticación con Backend.

## 2. CartContext

Responsabilidad:
Administrar el carrito de compras.

Estados propuestos:
- carrito
- cargando
- error

Funciones propuestas:
- agregarProducto()
- eliminarProducto()
- actualizarCantidad()
- vaciarCarrito()
- calcularSubtotal()

Consideraciones:
- Validar cantidades disponibles.
- Mostrar el total actualizado.
- Definir la persistencia del carrito.
- Vaciarlo solamente después de confirmar el pedido.
- El Backend debe validar precios y totales.

## 3. Decisiones pendientes

- Confirmar el contrato de API con Backend.
- Definir si se permite checkout como invitado.
- Acordar el manejo seguro de sesiones.
- Validar el almacenamiento del carrito.
- Revisar los flujos definitivos de Figma.

## Estado

Propuesta de arquitectura.
Pendiente de validación con PM, Backend y UX/UI.
