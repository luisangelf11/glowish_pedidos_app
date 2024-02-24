import Logo from "../assets/GW.png";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useState } from "react";
import MyAlert from "./MyAlert";

export default function MenuAdmin() {
  const {logout} = useAuthContext();
  const [myAlert, setMyAlert] = useState(false);

  const handleClick =(e)=>
   setMyAlert(true);
  
  const closeAlert =()=> setMyAlert(false);
  return (
    <>
    <nav className="bg-white flex flex-col justify-start items-center gap-2 fixed w-48 h-screen border-r">
      <img className=" w-28 h-28 p-1 object-cover" src={Logo} alt="logo" />
      <div>
        <h3
          style={{ color: "#222" }}
          className="text-center p-1 font-bold text-black uppercase"
        >
          Panel de control
        </h3>
        <p style={{ color: "#222" }} className="text-center">
          <span className="font-bold">Usuario: </span>
          <br />
          <span className="text-sm">Administrador</span>
        </p>
      </div>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `bg-red-300 p-2 
        rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
            : `bg-red-500 p-2 
        rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
        }
        to="/dashboard"
      >
        <i className="fas fa-chart-line mr-3"></i>
        Dashboard
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `bg-red-300 p-2 
      rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
            : `bg-red-500 p-2 
      rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
        }
        to="/productos"
      >
        <i className="fas fa-tshirt mr-3"></i>
        Productos
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `bg-red-300 p-2 
     rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
            : `bg-red-500 p-2 
     rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
        }
        to="/sizes"
      >
        <i className="fas fa-wave-square mr-3"></i>
        Sizes
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `bg-red-300 p-2 
      rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
            : `bg-red-500 p-2 
      rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
        }
        to="/colores"
      >
        <i className="fas fa-highlighter mr-3"></i>
        Colores
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `bg-red-300 p-2 
      rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
            : `bg-red-500 p-2 
      rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
        }
        to="/categorias"
      >
        <i className="fa-solid fa-layer-group mr-3"></i>
        Categorias
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `bg-red-300 p-2 
         rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
            : `bg-red-500 p-2 
         rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
        }
        to="/pedidos"
      >
        <i className="fas fa-box mr-3"></i>
        Pedidos
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `bg-red-300 p-2 
     rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
            : `bg-red-500 p-2 
     rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
        }
        to="/comentarios"
      >
        <i className="fas fa-comments mr-3"></i>
        Comentarios
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `bg-red-300 p-2 
   rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
            : `bg-red-500 p-2 
   rounded-md w-36 text-left text-white transition-all hover:bg-red-300 text-sm`
        }
        to="/usuarios"
      >
        <i className="fas fa-users mr-3"></i>
        Usuarios
      </NavLink>
      <button
      onClick={handleClick}
        className="bg-red-500 p-2 
        rounded-md w-36 text-left text-white transition-all hover:bg-red-300 cursor-pointer text-sm"
      >
        <i className="fas fa-sign-out-alt mr-3"></i>
        Cerrar Sesión
      </button>
    </nav>
      {myAlert && <MyAlert title={"Cerrar Sesión"} text={"Estás apunto de cerrar tu sesión. ¿Deseas continuar?"} onClose={closeAlert} onAction={logout}/>}
      </>
  );
}
