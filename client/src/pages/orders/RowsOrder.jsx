import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getUser } from '../../api/user';

export default function RowsOrder({ element, noRow, editOrder }) {
    const { Id, Monto, Fecha, Estado, Id_Usuario } = element
    const [user, setUser] = useState({});

    const generateText =()=>{
        if(Estado === 'Solicitado') return 'Enviar';
        else if(Estado === 'Enviado') return 'Entregar'

    }

    const getUserOrder=async()=>{
        try {
            const res = await getUser(Id_Usuario)
            setUser(res.data);
        } catch (error) {
            console.log(error)
        }
    }    

    useEffect(()=>{
        getUserOrder();
    }, []);

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
            <td className="text-center p-2 text-sm">{user.Nombre} {user.Apellido}</td>
            <td className="text-center p-2 text-sm">{user.Direccion}</td>
            <td className="text-center">
                {Estado !== 'Entregado' && Estado !== 'Cancelado' ? <button className='bg-blue-600 w-16 hover:bg-blue-500 text-white rounded-sm p-1 text-sm' onClick={()=> editOrder(Id, Estado)}>
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
