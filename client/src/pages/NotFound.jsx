import NotFoundImg from "../assets/404-page-animation-example.gif";
import { Link } from "react-router-dom";
import '../assets/css/animation.css'

export default function NotFound() {
  return (
    <section
      style={{ width: "86%" }}
      className="h-screen flex justify-center items-center flex-col overflow-hidden scale-up-center"
    >
      <img
        src={NotFoundImg}
        alt="404"
        style={{ width: "600px" }}
        className="object-cover"
      />
      <h2 className="font-bold text-xl uppercase text-red-800 p-2">
        Página no encontrada
      </h2>
      <p>La ruta a la que estás tratando de acceder no existe.</p>
      <Link
        to="/"
        className="p-2 bg-red-500 rounded text-white mt-2 transition-all hover:bg-red-400"
      >
        <i className="fas fa-hand-point-left p-1"></i>Regresar
      </Link>
    </section>
  );
}
