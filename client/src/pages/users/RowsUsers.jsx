import React from 'react'
import { useNavigate } from 'react-router-dom';
import userIcon from '../../assets/userIcon.jpg'

export default function RowsUsers({ element,  noRow }) {
    const {Id, Correo, Nombre, Apellido, Avatar, Direccion, Telefono}=element
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
        <td className="text-left p-2 text-sm"><img src={Avatar && userIcon} alt="avatar" className='w-10 h-10 object-cover'/></td>
        <td className="text-left p-2 text-sm w-48">{Correo}</td>
        <td className="text-left p-2 text-sm">{Nombre} {Apellido}</td>
        <td className="text-left p-2 text-sm w-48">{Direccion}</td>
        <td className="text-left p-2 text-sm w-48">{Telefono}</td>
       
      </tr>
      )
}
