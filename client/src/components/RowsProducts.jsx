import React from 'react'

export default function RowsProducts({element, deleteP}) {
    const {Id, Nombre, Descripcion, Imagen, Unidades, Precio, Descuento, Categoria} = element;
    
  return (
    <tr style={{
        borderBottom: '1px solid #ccc'
    }}
    className='transition-all cursor-pointer hover:bg-slate-200'>
        <td className='text-left p-2'>{Id}</td>
        <td className='text-left p-2'>{Nombre}</td>
        <td className='text-left p-2'>{Descripcion}</td>
        <td className='text-left p-2'>{Unidades}</td>
        <td className='text-left p-2'>{Precio}</td>
        <td className='text-left p-2'>{Descuento}</td>
        <td className='text-left p-2'>{Categoria}</td>
        <td className='text-left'>
            <button onClick={()=> console.log(Id)} className='p-1 text-green-700 cursor-pointer transition-all hover:text-green-600'><i className="fas fa-edit"></i></button>
            <button onClick={()=> deleteP(Id)} className='p-1 text-red-700 cursor-pointer transition-all hover:text-red-600'><i className="fas fa-trash"></i></button>
            {Imagen !== '' ? <a className='p-1 cursor-pointer transition-all text-blue-700 hover:text-blue-600' href={Imagen} target='_blank' rel="noreferrer">
            <i className="fas fa-images"></i>
            </a> : ''}
        </td>
    </tr>
  )
}
