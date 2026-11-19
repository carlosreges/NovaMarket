
import { Link } from "react-router-dom";

const categorias = [
  {
    nombre: "Computación y monitores",
    valor: "Computación",
  },
  {
    nombre: "Periféricos",
    valor: "Periféricos",
  },
  {
  nombre: "Escritorios y sillas",
  valor: "Muebles",
},
  {
    nombre: "Almacenamiento",
    valor: "Almacenamiento externo",
  },
  {
    nombre: "Accesorios",
    valor: "Accesorios",
  },
];

function Home() {
  return (
    <>
      <section
        className="home"
        aria-labelledby="titulo-inicio"
      >
        <div className="home-contenido">
          <h1 id="titulo-inicio">
            Tu mundo tecnológico en un solo lugar
          </h1>

          <p>
            Accesorios, periféricos y equipamiento de calidad
            para trabajar, estudiar y disfrutar.
          </p>

          <Link to="/productos" className="home-boton">
            Explorar productos
          </Link>
        </div>
      </section>

      <section
        className="categorias-home"
        aria-labelledby="titulo-categorias"
      >
        <h2 id="titulo-categorias">
          Explorá nuestras categorías
        </h2>

        <div className="categorias-home__lista">
          {categorias.map((categoria) => (
            <Link
              key={categoria.valor}
              to={`/productos?categoria=${encodeURIComponent(
                categoria.valor
              )}`}
              className="categoria-card"
            >
              <span>{categoria.nombre}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
