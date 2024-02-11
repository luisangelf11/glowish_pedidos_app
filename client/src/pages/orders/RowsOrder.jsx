import React from 'react'
import { Link } from 'react-router-dom';

export default function RowsOrder({ element, noRow, editOrder }) {
    const { Id, Monto, Fecha, Estado, Id_Usuario } = element
    const generateText =()=>{
        if(Estado === 'Solicitado') return 'Enviar';
        else if(Estado === 'Enviado') return 'Entregar'
    }
    return (
        <tr
            style={{
                borderBottom: "1px solid #ccc",
            }}
            className={`${(noRow + 1) % 2 === 0 ? 'bg-slate-200' : ''} transition-all cursor-pointer hover:bg-slate-100`}
        >
            <td className="text-center p-2 text-sm">{Id}</td>
            <td className="text-center p-2 text-sm">{Fecha}</td>
            <td className="text-center p-2 text-sm w-48">{Estado}</td>
            <td className="text-center p-2 text-sm">{Monto}</td>
            <td className="text-center p-2 text-sm">{Id_Usuario}</td>
            <td className="text-center">
                {Estado !== 'Entregado' ? <button className='bg-blue-600 w-16 hover:bg-blue-500 text-white rounded-sm p-1 text-sm' onClick={()=> editOrder(Id, Estado)}>
                    {generateText()}
                </button> : '--  --- --'}
            </td>
            <td className="text-center">
                <Link to={`/pedidos/${Id}`} className='bg-green-600 w-16 hover:bg-green-500 text-white rounded-sm p-1 text-sm'>
                    Mostrar
                </Link>
            </td>
        </tr>
    )
}
