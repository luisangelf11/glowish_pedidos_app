import React, { useEffect, useState } from "react";
import MenuUser from "../../components/MenuUser";
import ErrorData from "../../components/ErrorData";
import { getCategorys } from "../../api/category";

export default function ListCategoryPage() {
  const [categorys, setCategorys] = useState([]);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ id: "" });
  const [data, setData] = useState([]);

  const getCategorysData = async () => {
    try {
      const res = await getCategorys();
      setCategorys(res.data);
    } catch (err) {
      setError(false);
    }
  };

  const handleChange=(e)=>{
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
  }

  useEffect(()=>{
    getCategorysData()
  }, []);

  return (
    <section className="flex flex-col h-screen">
      <MenuUser />
      {error ? (
        <ErrorData />
      ) : (
        <article className="w-full gap-2 flex flex-col items-center mt-16">
          <h2
            className="p-6 uppercase text-red-400 text-xl font-bold scale-up-center"
            style={{
              letterSpacing: "10px",
            }}
          >
            Productos de la categoría:
          </h2>
          <form className="flex gap-3 scale-up-center">
            <label htmlFor="category" className="font-semibold p-1 text-gray-500">Selecciona una categoría:</label>
            <select
              name="id"
              id="category"
              className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              value={form.id}
              onChange={handleChange}
            >
              <option value="">--OPCIONES--</option>
              {categorys.map((el, index) => (
                <option key={index} value={el.Id}>
                  {el.Nombre}
                </option>
              ))}
            </select>
          </form>
        </article>
      )}
    </section>
  );
}
