import React from 'react'

export default function RowsSizes({ element, deleteP, noRow }) {
    const { Id, Comentario, Fecha, Id_Producto, Id_Usuario } = element

    return (
        <tr
            style={{
                borderBottom: "1px solid #ccc",
            }}
            className={`${(noRow + 1) % 2 === 0 ? 'bg-slate-200' : ''} transition-all cursor-pointer hover:bg-slate-100`}
        >
            <td className="text-left p-2 text-sm">{Id}</td>
            <td className="text-left p-2 text-sm w-48">{Comentario}</td>
            <td className="text-left p-2 text-sm">{Fecha}</td>
            <td className="text-left p-2 text-sm">{Id_Producto}</td>
            <td className="text-left p-2 text-sm">{Id_Usuario}</td>
            <td className="text-left">

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
