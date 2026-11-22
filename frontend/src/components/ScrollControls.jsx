
import { useEffect, useState } from "react";
import "./ScrollControls.css";

function ScrollControls() {
  const [posicion, setPosicion] = useState({
    arriba: false,
    abajo: false,
  });

  useEffect(() => {
    const actualizar = () => {
      const documento = document.documentElement;
      const desplazamiento = window.scrollY;
      const alturaVisible = window.innerHeight;
      const alturaTotal = documento.scrollHeight;

      setPosicion({
        arriba: desplazamiento > 10,
        abajo:
          desplazamiento + alturaVisible < alturaTotal - 10,
      });
    };

    actualizar();

    window.addEventListener("scroll", actualizar, {
      passive: true,
    });
    window.addEventListener("resize", actualizar);

    return () => {
      window.removeEventListener("scroll", actualizar);
      window.removeEventListener("resize", actualizar);
    };
  }, []);

  const desplazar = (direccion) => {
    const movimientoReducido = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const distancia = Math.round(window.innerHeight * 0.75);

    window.scrollBy({
      top: direccion === "arriba" ? -distancia : distancia,
      behavior: movimientoReducido ? "instant" : "smooth",
    });
  };

  if (!posicion.arriba && !posicion.abajo) {
    return null;
  }

  return (
    <nav
      className="scroll-controls"
      aria-label="Controles de desplazamiento"
    >
      {posicion.arriba && (
        <button
          type="button"
          onClick={() => desplazar("arriba")}
          aria-label="Subir una sección"
          title="Subir una sección"
        >
          <span aria-hidden="true">↑</span>
        </button>
      )}

      {posicion.abajo && (
        <button
          type="button"
          onClick={() => desplazar("abajo")}
          aria-label="Bajar una sección"
          title="Bajar una sección"
        >
          <span aria-hidden="true">↓</span>
        </button>
      )}
    </nav>
  );
}

export default ScrollControls;
