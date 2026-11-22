
import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";

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
      <HeroCarousel />

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
