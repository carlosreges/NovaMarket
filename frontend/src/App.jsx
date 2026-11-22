
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ScrollControls from "./components/ScrollControls";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import ConfirmacionPedido from "./pages/ConfirmacionPedido";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/confirmacion"
            element={<ConfirmacionPedido />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<h2>Página no encontrada</h2>}
          />
        </Route>
      </Routes>

      <ScrollControls />
    </>
  );
}

export default App;
