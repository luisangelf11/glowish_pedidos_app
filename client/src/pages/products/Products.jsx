import React, { useEffect, useState } from "react";
import MenuAdmin from "../../components/MenuAdmin";
import TableContent from "../../components/TableContent";
import { filterProducts, getProducts } from "../../api/products";
import { toast, Toaster } from "react-hot-toast";
import '../../assets/css/animation.css'
import {Link} from 'react-router-dom'

export default function Products() {
  //State
  const [data, setData] = useState([]);
  const [form, setForm] = useState({filter: ''});

  const getData = async () => {
    try {
      const res = await getProducts(10, 0);
      setData(res.data);
    } catch (err) {
      toast.error(err.response.data.message);
      setData([]);
    }
  };

  const filterData =async(name)=>{
    try{
        const res = await filterProducts(name);
        setData(res.data);
    }
    catch{
        setData([]);
    }
  }

  useEffect(() => {
    if(form.filter === '') getData();
    else filterData(form.filter)
  }, [form.filter]);

  const handleChange =(e)=>{
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <MenuAdmin />
      <section
        style={{ width: "86%" }}
        className="bg-gray-100 gap-2 flex flex-col items-center "
      >
        <div
          className="flex justify-around p-2 scale-up-center "
          style={{ width: "100%" }}
        >
          <div className="flex flex-col">
          <h2 className="text-left p-2 uppercase text-red-500 font-bold text-xl">
            Control de productos
          </h2>
          <form
            className="bg-white p-1 border rounded-xl"
            style={{ width: "700px" }}
          >
            <i className="fas fa-search p-2 text-red-400"></i>
            <input
              type="text"
              name="filter"
              placeholder="Buscar..."
              className="outline-none text-sm w-11/12"
              value={form.filter}
              onChange={handleChange}
            />
          </form>
          </div>
          <Link to='/nuevo-producto' className="bg-green-700 flex justify-center items-center p-1 w-44 h-10 mt-12 rounded-sm text-white font-semibold transition-all hover:bg-green-600">
          <i className="fas fa-plus p-1"></i>
            Nuevo Producto
          </Link>
        </div>
        <TableContent
          data={data}
          tableHead={[
            "Id",
            "Nombre",
            "Descripción",
            "Unidades",
            "Precio",
            "Descuento",
            "Categoría",
            "Acciones",
          ]}
        />
        <Toaster position="top-center" />
      </section>
    </>
  );
}
