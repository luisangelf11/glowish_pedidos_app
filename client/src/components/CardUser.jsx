import React, { useEffect, useState } from "react";
import imgUser from "../assets/userIcon.jpg";
import { getUser } from "../api/user";

export default function CardUser({ data }) {
  const { id_usuario, total_pedidos } = data;
  const [dataUser, setDataUser] = useState({});
  const getData = async () => {
    try {
      const res = await getUser(id_usuario);
      setDataUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex gap-2 p-2">
      <img src={dataUser.Avatar || imgUser} alt="User profile" className="w-10 h-10 object-cover rounded-full"/>
      <div className="text-sm">
      <p>{dataUser.Correo}</p>
      <p><span className="font-semibold text-red-400">Compras:</span> {total_pedidos}</p>
      </div>
    </div>
  );
}
