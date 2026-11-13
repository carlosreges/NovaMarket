# NovaMarket E-commerce 🛒

Proyecto de e-commerce tecnológico desarrollado por el Grupo 2602 de Talently Lab.

## Frontend

Aplicación web desarrollada con React y Vite para el MVP de NovaMarket.

El proyecto se encuentra en desarrollo y actualmente utiliza datos de prueba mientras se coordinan las integraciones con Backend y los diseños definitivos de UX/UI.

## Tecnologías

- React
- JavaScript
- Vite
- React Router
- CSS
- Context API
- localStorage
- Git y GitHub

## Instalación

Clonar el repositorio:

`git clone https://github.com/crysty72/novamarket-frontend.git`

Ingresar al proyecto:

`cd novamarket-frontend`

Instalar dependencias:

`npm install`

Ejecutar el proyecto:

`npm run dev`

Verificar el código:

`npm run lint`

Generar la versión de producción:

`npm run build`

## Estado del desarrollo

### Semana 1 — Análisis y planificación

- Identificación de vistas y componentes del MVP.
- Propuesta de stack tecnológico.
- Mapa de navegación.
- Documentación inicial de arquitectura.

### Semana 2 — Arquitectura y componentización

- Organización de carpetas del proyecto.
- Documentación inicial de componentes y props.
- Planificación de las rutas.
- Implementación inicial de CartContext.
- Definición de responsabilidades del estado local y global.
- Revisión de diseño con UX/UI pendiente.

### Funcionalidades implementadas

- Página de inicio.
- Navbar y navegación con React Router.
- Catálogo con productos de prueba.
- Búsqueda de productos.
- Filtros por categoría.
- Detalle individual de productos.
- Disponibilidad de stock.
- Carrito de compras.
- Agregar y eliminar productos del carrito.
- Modificación de cantidades.
- Cálculo del total.
- Persistencia del carrito mediante localStorage.

### Funcionalidades pendientes

- Integración con API de Backend.
- Registro e inicio de sesión.
- AuthContext y rutas protegidas.
- Checkout simulado y confirmación de pedidos.
- Panel administrativo.
- Aplicación del diseño definitivo de Figma.

## Arquitectura de carpetas

- **src/assets/**: recursos visuales.
- **src/components/**: componentes reutilizables de interfaz.
- **src/pages/**: páginas completas de la aplicación.
- **src/context/**: estado compartido mediante Context API.
- **src/data/**: datos de prueba utilizados durante el desarrollo.
- **src/services/**: futura comunicación con la API de Backend.
- **src/routes/**: documentación y futura organización de rutas y protecciones.
- **src/styles/**: organización de estilos.
- **src/App.jsx**: configuración de las rutas actuales.
- **src/main.jsx**: inicialización de React y proveedores globales.

## Decisiones de arquitectura

### Estado local

Se utiliza `useState` para información que pertenece a un componente o pantalla.

Ejemplos:

- Texto ingresado en el buscador.
- Categoría seleccionada.
- Filtros del catálogo.
- Estados visuales de formularios cuando se implementen.

### Estado global

Se utiliza Context API para información compartida entre distintas páginas y componentes.

**CartContext — Implementado**

Centraliza:

- Productos del carrito.
- Agregado y eliminación de artículos.
- Actualización de cantidades.
- Cantidad total de artículos.
- Cálculo del importe total.
- Persistencia con localStorage.

**AuthContext — Pendiente**

Se propone utilizarlo para compartir la información de sesión y autenticación, sujeto a la integración con Backend.

### Datos y servicios

Actualmente, el catálogo utiliza productos de prueba almacenados en `src/data/productosDemo.js`.

La carpeta `src/services` está preparada para centralizar las futuras llamadas HTTP.

Los precios, el stock, los permisos y la creación de pedidos deberán ser validados por Backend. Los cálculos del carrito en Frontend son preliminares.

## Navegación actual

- `/` — Inicio.
- `/productos` — Catálogo.
- `/productos/:id` — Detalle de producto.
- `/carrito` — Carrito de compras.
- `/login` — Ruta temporal.
- `*` — Página no encontrada.

Los nombres definitivos de las rutas deberán acordarse con el equipo.

## Componentización

Se prioriza la reutilización de componentes para evitar duplicar código.

Componentes existentes:

- Navbar
- ProductCard

Componentes previstos según el MVP:

- Footer
- ProductSearch
- CategoryFilter
- CartItem
- CartSummary
- AuthForm
- CheckoutForm
- ProductForm
- LoadingSpinner
- EmptyState
- ErrorMessage

Las propiedades, estados visuales y componentes definitivos se ajustarán de acuerdo con el prototipo de UX/UI.

## Coordinación con el equipo

**UX/UI:** validar estructura visual, componentes, diseño responsive y estados de interfaz.

**Backend:** acordar contratos de API, autenticación, datos de productos, stock y pedidos.

**PM:** validar la arquitectura y la prioridad del flujo de compra como invitado, incluyendo la propuesta de registro posterior al checkout.

**QA:** revisar los criterios de aceptación y casos de prueba.

## Repositorio

Repositorio inicial privado de Frontend:

https://github.com/crysty72/novamarket-frontend

El repositorio y la estrategia de integración definitiva deberán acordarse con el equipo.

## Equipo

**Proyecto:** NovaMarket E-commerce

**Grupo:** 2602 — Talently Lab

**Frontend inicial:** Cristina Carrizo

## Nota

Proyecto en desarrollo. La arquitectura y los componentes constituyen una implementación y propuesta inicial, sujetas a revisión y aprobación del equipo.