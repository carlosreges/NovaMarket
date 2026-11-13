# NovaMarket — Plataforma E-commerce MVP

Plataforma web para la venta de productos tecnológicos. Proyecto simulado de 8 semanas impulsado por **Talently Lab**.

## Estructura del repositorio

```
nova-market/
├── backend/      # Backend (Node.js + Express + PostgreSQL)
└── frontend/     # Frontend (React / Vite / HTML+CSS+JS) — añadido por la colaboradora
```

## Iniciar el proyecto localmente

### 1. Backend (Node.js + Express + PostgreSQL)

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL
npm run dev
```

El servidor levantará en `http://localhost:3000`

### 2. Frontend (React / Vite / HTML+CSS+JS)

```bash
cd frontend
npm install
npm run dev
```

El frontend cargará en `http://localhost:5173` (o el puerto que indique Vite)

> 💡 Asegúrate de crear la base de datos `novamarket` y ejecutar el esquema:
> ```bash
> createdb novamarket
> psql -U postgres -d novamarket -f backend/src/config/schema.sql
> npm run seed
> ```

## Convenciones de trabajo en equipo

- **Commits** al finalizar cada tarea, no al final del día.
- **Branches** por funcionalidad (ej: `feature/login`, `feature/carrito`).
- **Documentar** decisiones técnicas en el README o en un documento compartido.
- Prioridad: **funcionalidad antes que optimización** (MVP).
- Leer el error completo antes de buscar ayuda.
- Trabajar en **bloques de tiempo definidos**.

## Endpoints del backend

Ver `backend/README.md` para la lista completa de endpoints REST y sus respuestas.

## KPIs consultables

| KPI | Fórmula | Fuente |
|-----|---------|--------|
| Ticket promedio | `total ventas / cantidad de compras` | `GET /api/admin/orders` |
| Tasa de abandono de carrito | `(carritos inconclusos / total) × 100` | `CARTS.status` |

## Licencia

MIT — Entorno educativo/prototipo.