
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import ConfirmacionPedido from "./pages/ConfirmacionPedido";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

         <Route path="/productos" element={<Productos />} />

          <Route path="/carrito" element={<Carrito />} />

          <Route
            path="/login"
            element={<h2>Iniciar sesión</h2>}
          />

          <Route
            path="*"
            element={<h2>Página no encontrada</h2>}
          />
<Route
  path="/productos/:id"
  element={<DetalleProducto />}
/>

<Route path="/checkout" element={<Checkout />} />

<Route
  path="/confirmacion"
  element={<ConfirmacionPedido />}
/>

        </Routes>
      </main>
    </>
  );
}

export default App;
