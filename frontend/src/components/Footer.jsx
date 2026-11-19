import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <div>
          <strong className="site-footer__brand">NovaMarket</strong>
          <p>Tu mundo tecnológico en un solo lugar.</p>
        </div>
        <nav aria-label="Enlaces del pie de página" className="site-footer__links">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/carrito">Carrito</Link>
        </nav>
      </div>
      <p className="site-footer__legal">
        © {new Date().getFullYear()} NovaMarket · Proyecto de demostración.
      </p>
    </footer>
  );
}

export default Footer;
