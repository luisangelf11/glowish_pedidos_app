import React from 'react'

export default function ItemCreateOrder({data}) {
    const  {color, descuento, precio, imagen, size, unidades, total, nombre} = data;
  return (
    <div className="flex justify-center gap-5">
      <div>
        <img src={imagen} alt="Product Image" className="w-40 h-40 object-cover rounded-sm"/>
        <h3 className="text-center font-bold text-red-500 uppercase p-1">{nombre}</h3>
      </div>
      <div className="text-sm text-gray-600 font-semibold">
        <p>Unidades: {unidades}</p>
        <p>Precio Unitario: $RD {parseFloat(precio).toFixed(2)}</p>
        <p>SubTotal: $RD {parseFloat(total).toFixed(2)}</p>
        <p>Color: {color}</p>
        <p>Size: {size}</p>
        <p>Descuento: {descuento}%</p>
      </div>
    </div>
  )
}
