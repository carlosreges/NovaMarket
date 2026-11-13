
# NovaMarket - Arquitectura de rutas

## Frontend - Semana 2

Propuesta inicial de navegación con React Router.

## 1. Rutas públicas

| Ruta | Pantalla |
|---|---|
| / | Inicio y catálogo |
| /productos/:id | Detalle del producto |
| /login | Inicio de sesión |
| /registro | Registro de usuario |

## 2. Rutas de compra

| Ruta | Pantalla |
|---|---|
| /carrito | Carrito de compras |
| /checkout | Checkout simulado |
| /confirmacion | Confirmación del pedido |

El acceso al checkout como invitado está pendiente
de validación con PM y Backend.

## 3. Rutas administrativas

| Ruta | Pantalla |
|---|---|
| /admin | Panel de administración |
| /admin/productos | Gestión de productos |
| /admin/pedidos | Consulta de pedidos |

Estas rutas requerirán autenticación y rol ADMIN.

## 4. Componentes de protección

ProtectedRoute:
- Verificar si existe una sesión válida.
- Mostrar un estado de carga durante la verificación.
- Redirigir al login cuando corresponda.

AdminRoute:
- Verificar que el usuario tenga rol ADMIN.
- Impedir el acceso a usuarios sin autorización.
- Coordinar los permisos con Backend.

## 5. Decisiones pendientes

- Unificar los nombres de rutas con NMKT-19.
- Confirmar las rutas definitivas con UX/UI.
- Definir el checkout como invitado.
- Validar roles y permisos con Backend.
- Incorporar las vistas de pedidos del cliente,
  si se mantienen en el alcance aprobado.

## Estado

Documento de planificación inicial.
Pendiente de validación del equipo.
