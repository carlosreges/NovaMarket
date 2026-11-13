
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home" aria-labelledby="titulo-inicio">
      <div className="home-contenido">
        <h1 id="titulo-inicio">
          Bienvenidos a NovaMarket
        </h1>

        <p>
          Descubrí accesorios, periféricos y gadgets
          tecnológicos para trabajar, estudiar y disfrutar.
        </p>

        <Link to="/productos" className="home-boton">
          Explorar productos
        </Link>
      </div>
    </section>
  );
}

export default Home;
