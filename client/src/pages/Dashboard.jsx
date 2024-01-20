import { Link } from "react-router-dom";
import MenuAdmin from "../components/MenuAdmin";

export default function Dashboard() {
  return (
    <>
        <MenuAdmin />
        <div style={{width: '86%'}} className="bg-gray-100 flex flex-col items-center justify-center">
        Dashboard
        <Link to='/catalogo'>Catalogo</Link>
        </div>
    </>
  )
}
