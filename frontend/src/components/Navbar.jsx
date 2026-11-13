
import { Link } from "react-router-dom";
import logoNovaMarket from "../assets/logo_horizontal_negativo.svg";

function Navbar() {
  return (
    <header>
      <nav aria-label="Navegación principal">
       <Link to="/" aria-label="NovaMarket - Ir al inicio">
  <img
    src={logoNovaMarket}
    alt="NovaMarket"
    style={{
      width: "180px",
      height: "auto",
      display: "block",
    }}
  />
</Link>
        <div>
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/carrito">Carrito</Link>
          <Link to="/login">Ingresar</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
