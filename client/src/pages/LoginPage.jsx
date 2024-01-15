import LoginIMG from "../assets/login-bg.png";
import GW from '../assets/GW.png';
import { Link} from 'react-router-dom'
import '../assets/css/animation.css'

export default function LoginPage() {
  return (
    <section className="flex items-center justify-center h-screen w-screen">
      <div className="flex items-center justify-center h-auto w-auto shadow-2xl scale-up-center">
        <div className="flex flex-col items-center p-2">
          <img src={LoginIMG} alt="login" className=" w-96" />
          <p className="text-center block w-64 p-2 text-slate-800">
            Descubre una gran variedad de productos al mejor precio del mercado.
            ¿Qué esperas para iniciar sesión?
          </p>
        </div>
        <form className="flex flex-col gap-2 items-center p-2">
          <img src={GW} alt="logo-gw" className=" w-20"/>
          <h2 className="uppercase text-red-500 text-xl font-bold">
            Iniciar sesión
          </h2>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="p-2 font-bold text-sm text-red-400 uppercase"
            >
              <i className="fas fa-envelope p-1"></i>
              E-mail:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              style={{
                transition: "all .1s ease-in-out",
              }}
              className="border-collapse text-sm border-gray-400 p-1 w-52 rounded-sm border outline-none focus:border-blue-500 focus:border-2"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="p-2 font-bold text-sm text-red-400 uppercase">
            <i className="fas fa-unlock-alt p-1"></i>
              Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              style={{
                transition: "all .1s ease-in-out",
              }}
              className="border-collapse border-gray-400 text-sm p-1 w-52 rounded-sm border outline-none focus:border-blue-500 focus:border-2"
              placeholder="Contraseña"
            />
          </div>
          <div className="flex justify-center gap-2 mt-4">
          <button className="uppercase font-bold text-center text-sm text-white bg-blue-600 h-8 p-1 w-20 rounded transition-all hover:bg-blue-400">Login</button>
          <Link to='/register' className="text-sm w-36 block text-center">¿Aún no tienes una cuenta? <span className="font-bold text-red-400">Registrate Aquí</span></Link>
          </div>
        </form>
      </div>
    </section>
  );
}
