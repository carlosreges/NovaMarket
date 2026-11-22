
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import banner1 from "../assets/banners/banner-1.png";
import banner2 from "../assets/banners/banner-2.png";
import banner3 from "../assets/banners/banner-3.png";

import "./HeroCarousel.css";

const banners = [
  { imagen: banner1, descripcion: "Promoción tecnológica NovaMarket 1" },
  { imagen: banner2, descripcion: "Promoción tecnológica NovaMarket 2" },
  { imagen: banner3, descripcion: "Promoción tecnológica NovaMarket 3" },
];

function HeroCarousel() {
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActivo((anterior) => (anterior + 1) % banners.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [activo]);

  const anterior = () => {
    setActivo((actual) => (actual - 1 + banners.length) % banners.length);
  };

  const siguiente = () => {
    setActivo((actual) => (actual + 1) % banners.length);
  };

  return (
    <section
      className="hero-carousel"
      aria-label="Novedades de NovaMarket"
      aria-roledescription="carrusel"
    >
      <div className="hero-carousel__contenido">
        {banners.map((banner, indice) => (
          <Link
            key={banner.imagen}
            to="/productos"
            className={`hero-carousel__slide ${
              indice === activo ? "hero-carousel__slide--activo" : ""
            }`}
            aria-hidden={indice !== activo}
            tabIndex={indice === activo ? 0 : -1}
          >
            <img
              src={banner.imagen}
              alt={banner.descripcion}
              loading={indice === 0 ? "eager" : "lazy"}
            />
          </Link>
        ))}

        <button
          type="button"
          className="hero-carousel__flecha hero-carousel__flecha--izquierda"
          onClick={anterior}
          aria-label="Banner anterior"
        >
          &#10094;
        </button>

        <button
          type="button"
          className="hero-carousel__flecha hero-carousel__flecha--derecha"
          onClick={siguiente}
          aria-label="Siguiente banner"
        >
          &#10095;
        </button>
      </div>

      <div className="hero-carousel__indicadores" aria-label="Elegir banner">
        {banners.map((banner, indice) => (
          <button
            key={banner.imagen}
            type="button"
            className={`hero-carousel__punto ${
              indice === activo ? "hero-carousel__punto--activo" : ""
            }`}
            onClick={() => setActivo(indice)}
            aria-label={`Mostrar banner ${indice + 1}`}
            aria-current={indice === activo ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;
