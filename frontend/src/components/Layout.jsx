import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="site-layout">
      <Navbar />
      <main id="contenido-principal" className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
