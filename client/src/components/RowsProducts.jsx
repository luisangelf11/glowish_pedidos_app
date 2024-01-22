import React from "react";
import { useNavigate } from "react-router-dom";

export default function RowsProducts({ element, deleteP, noRow }) {
  const {
    Id,
    Nombre,
    Descripcion,
    Imagen,
    Unidades,
    Precio,
    Descuento,
    Categoria,
  } = element;
  const navigate = useNavigate();

  const editGo = (id) => navigate(`/editar-producto/${id}`);

  return (
    <tr
      style={{
        borderBottom: "1px solid #ccc",
      }}
      className={`${(noRow + 1) % 2 === 0 ? 'bg-slate-200': ''} transition-all cursor-pointer hover:bg-slate-100`}
    >
      <td className="text-left p-2 text-sm">{Id}</td>
      <td className="text-left p-2 text-sm">{Nombre}</td>
      <td className="text-left p-2 text-sm">{Descripcion}</td>
      <td className="text-left p-2 text-sm">{Unidades}</td>
      <td className="text-left p-2 text-sm">{Precio}</td>
      <td className="text-left p-2 text-sm">{Descuento}</td>
      <td className="text-left p-2 text-sm">{Categoria}</td>
      <td className="text-left">
        <button
          onClick={() => editGo(Id)}
          className="p-1 text-green-700 cursor-pointer transition-all hover:text-green-600"
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          onClick={() => deleteP(Id)}
          className="p-1 text-red-700 cursor-pointer transition-all hover:text-red-600"
        >
          <i className="fas fa-trash"></i>
        </button>
        {Imagen !== "" && Imagen !== null ? (
          <a
            className="p-1 cursor-pointer transition-all text-blue-700 hover:text-blue-600"
            href={Imagen}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-images"></i>
          </a>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
}
