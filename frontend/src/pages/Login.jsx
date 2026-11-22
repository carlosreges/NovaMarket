
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMensaje("");

    if (!email.trim() || !password.trim()) {
      setMensaje("Completá todos los campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMensaje("Ingresá un correo electrónico válido.");
      return;
    }

    setMensaje(
      "El formulario está listo. La conexión con el inicio de sesión estará disponible próximamente."
    );
  };

  return (
    <section className="login-page" aria-labelledby="login-titulo">
      <div className="login-card">
        <div className="login-card__encabezado">
          <h1 id="login-titulo">Bienvenido a NovaMarket</h1>
          <p>Ingresá tus datos para acceder a tu cuenta.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email"
            type="email"
            placeholder="tuemail@ejemplo.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="login-password">Contraseña</label>
          <div className="login-password">
            <input
              id="login-password"
              type={mostrarPassword ? "text" : "password"}
              placeholder="Ingresá tu contraseña"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={() => setMostrarPassword(!mostrarPassword)}
              aria-label={
                mostrarPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
            >
              {mostrarPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          <button type="submit" className="login-submit">
            Ingresar
          </button>

          {mensaje && (
            <p className="login-mensaje" role="status">
              {mensaje}
            </p>
          )}
        </form>

        <div className="login-card__pie">
          <p>¿Todavía no tenés una cuenta?</p>
          <span>El registro estará disponible próximamente.</span>
          <Link to="/productos">Seguir explorando productos</Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
