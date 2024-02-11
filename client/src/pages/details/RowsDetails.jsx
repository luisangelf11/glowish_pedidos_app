import React from 'react'

export default function RowsDetails({ element, noRow }) {
    const { Id_Producto, Fecha, Unidades, Descuento, Size, Color, SubTotal } = element
    return (
        <tr
            style={{
                borderBottom: "1px solid #ccc",
            }}
            className={`${(noRow + 1) % 2 === 0 ? 'bg-slate-200' : ''} transition-all cursor-pointer hover:bg-slate-100`}
        >
            <td className="text-center p-2 text-sm">{Id_Producto}</td>
            <td className="text-center p-2 text-sm w-48">{Unidades}</td>
            <td className="text-center p-2 text-sm">{Descuento}</td>
            <td className="text-center p-2 text-sm">{Size}</td>
            <td className="text-center p-2 text-sm">{Color}</td>
            <td className="text-center p-2 text-sm">{SubTotal}</td>
        </tr>
    )
}
