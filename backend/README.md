# NovaMarket Backend

Backend MVP para plataforma e-commerce de productos tecnológicos.
**Stack:** Node.js + Express + PostgreSQL + JWT
**Alineado con:** Documento "Esquema backend + KPIs" (Oct 2026)

## Estructura del proyecto

```
backend/
├── server.js                 # Punto de entrada
├── package.json              # Dependencias y scripts
├── .env.example              # Variables de entorno (copiar a .env)
├── .gitignore
├── src/
│   ├── app.js                # Configuración de Express y middlewares
│   ├── config/
│   │   ├── db.js             # Conexión a PostgreSQL (pg Pool)
│   │   └── schema.sql        # Esquema SQL de tablas (7 entidades + campos KPI)
│   ├── controllers/          # Lógica de endpoints
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── checkoutController.js
│   ├── models/               # Acceso a datos (consultas SQL con pg)
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   ├── categoryModel.js
│   │   ├── orderModel.js
│   │   └── cartModel.js
│   ├── routes/               # Definición de rutas REST
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── checkoutRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js # verify JWT + requireAdmin
│   └── scripts/
│       └── seed.js           # Poblado inicial de datos
```

## Modelo de datos (7 entidades)

| Tabla | Campos clave | Campos KPI (área de datos) |
|-------|-------------|---------------------------|
| USERS | id, name, email, password, role | gender, birth_date, province |
| CATEGORIES | id, name | — |
| PRODUCTS | name, description, price, stock, category_id | color, brand |
| CARTS | user_id, status | status, updated_at |
| CART_ITEMS | cart_id, product_id, quantity | — |
| ORDERS | user_id, total, status, created_at | discount, payment_method |
| ORDER_ITEMS | order_id, product_id, quantity | unit_price |

## Endpoints (alineados con el documento oficial)

### Autenticación
| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| POST | `/api/auth/register` | Registro de usuario | Público |
| POST | `/api/auth/login` | Login (devuelve JWT) | Público |
| POST | `/api/auth/logout` | Cierre de sesión (simulado) | JWT |
| GET | `/api/auth/me` | Datos del usuario autenticado | JWT |

### Catálogo
| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| GET | `/api/categories` | Listar categorías | Público |
| GET | `/api/products` | Listar productos (`?category=ID`) | Público |
| GET | `/api/products/:id` | Detalle de producto | Público |

### Carrito
| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| GET | `/api/cart/items` | Ver carrito activo | JWT |
| POST | `/api/cart/items` | Agregar producto al carrito | JWT |
| PUT | `/api/cart/items/:id` | Modificar cantidad (id = product_id) | JWT |
| DELETE | `/api/cart/items/:id` | Quitar ítem (id = product_id) | JWT |
| DELETE | `/api/cart` | Marcar carrito como abandonado | JWT |

### Checkout
| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| POST | `/api/checkout` | Confirma el pedido (simulado, sin pago real) | JWT |

### Órdenes
| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| GET | `/api/orders` | Historial de órdenes del usuario | JWT |
| GET | `/api/orders/:id` | Detalle de una orden | JWT |

### Admin
| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| POST | `/api/admin/products` | Crear producto | JWT + Admin |
| PUT | `/api/admin/products/:id` | Editar producto | JWT + Admin |
| DELETE | `/api/admin/products/:id` | Eliminar producto | JWT + Admin |
| GET | `/api/admin/orders` | Ver todos los pedidos | JWT + Admin |
| PUT | `/api/admin/orders/:id/status` | Cambiar estado de orden | JWT + Admin |

## KPIs soportados por el backend

| KPI | Origen de datos | Endpoint |
|-----|----------------|----------|
| Ticket promedio | `ORDERS.total` | `GET /api/admin/orders` |
| Tasa de abandono de carrito | `CARTS.status` | `GET /api/admin/orders` + analytics |
| Datos demográficos | `USERS.gender`, `birth_date`, `province` | — |
| Matriz de producto | `PRODUCTS.color`, `brand`, `category_id` | — |

## Instalación y ejecución

### 1. Instalar dependencias
```bash
cd backend
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL
```

### 3. Crear base de datos
```bash
createdb novamarket
psql -U postgres -d novamarket -f src/config/schema.sql
```

### 4. Poblado inicial (opcional)
```bash
npm run seed
```
Usuarios creados:
- Admin: `admin@novamarket.com` / `admin123`
- Cliente: `cliente@novamarket.com` / `cliente123`

### 5. Iniciar servidor
```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

El servidor estará en `http://localhost:3000`.

## Probando con Postman

1. **Registro:** `POST http://localhost:3000/api/auth/register` con JSON `{name, email, password}`
2. **Login:** `POST http://localhost:3000/api/auth/login` con JSON `{email, password}` → guardar el `token`
3. **Endpoints protegidos:** enviar header `Authorization: Bearer <token>`
4. **Admin:** usar credenciales de admin y token para rutas `/api/admin/*`

## Notas del equipo

- Commits al finalizar cada tarea, no al final del día.
- Documentar decisiones en el README o en un doc compartido.
- Leer el error completo antes de pedir ayuda.
- Prioridad: funcionalidad antes que optimización (MVP).