import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function RowsSizes({ element, deleteP, noRow }) {
    const {Id, Size, Estado, Id_Producto}=element
    const navigate = useNavigate();
      const editGo = (id) => navigate(`/editar-sizes/${id}`);
    return (
        <tr
        style={{
          borderBottom: "1px solid #ccc",
        }}
        className={`${(noRow + 1) % 2 === 0 ? 'bg-slate-200': ''} transition-all cursor-pointer hover:bg-slate-100`}
      >
        <td className="text-left p-2 text-sm">{Id}</td>
        <td className="text-left p-2 text-sm w-48">{Size}</td>
        <td className="text-left p-2 text-sm">{Estado}</td>
        <td className="text-left p-2 text-sm">{Id_Producto}</td>
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
        </td>
      </tr>
      )
}
