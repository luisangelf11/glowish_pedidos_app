import { Link } from "react-router-dom";
import MenuAdmin from "../components/MenuAdmin";

export default function Dashboard() {
  return (
    <section className="flex h-screen">
        <MenuAdmin />
        <div style={{width: '86%'}} className="bg-gray-100 flex ml-auto flex-col items-center justify-center">
        Dashboard
        <Link to='/catalogo'>Catalogo</Link>
        </div>
    </section>
  )
}
