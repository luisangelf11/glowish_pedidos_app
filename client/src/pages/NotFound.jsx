import NotFoundImg from "../assets/404-page-animation-example.gif";
import { useNavigate } from "react-router-dom";
import "../assets/css/animation.css";
import { useAuthContext } from "../context/authContext";

export default function NotFound() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClick = (e) => {
    if (user !== null) {
      if (user.Rol === "admin") navigate("/dashboard");
      else navigate("/");
    } else navigate("/");
  };

  return (
    <section className="h-screen w-screen flex justify-center items-center flex-col overflow-hidden">
      <img
        src={NotFoundImg}
        alt="404"
        style={{ width: "600px" }}
        className="object-cover scale-up-center"
      />
      <h2 className="font-bold text-xl uppercase text-red-800 p-2 scale-up-center">
        Página no encontrada
      </h2>
      <p className="scale-up-center">
        La ruta a la que estás tratando de acceder no existe.
      </p>
      <button
        onClick={handleClick}
        className="p-2 bg-red-500 rounded scale-up-center text-white mt-2  transition-all hover:bg-red-400"
      >
        <i className="fas fa-hand-point-left p-1"></i>Regresar
      </button>
    </section>
  );
}
