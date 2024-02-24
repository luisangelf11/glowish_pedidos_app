import React from 'react'

export default function ItemCreateOrder({data}) {
    const  {Color, Descuento, Precio, Imagen, Size, Unidades,  Nombre} = data;
    const generateNewPrice = (precio, descuento) => {
      let desc = parseFloat(precio) * parseFloat(descuento / 100);
      let newPrice = parseFloat(precio) - parseFloat(desc);
      return newPrice;
    };
  return (
    <div className="flex justify-center gap-5">
      <div>
        <img src={Imagen} alt="Product Image" className="w-40 h-40 object-cover rounded-sm"/>
        <h3 className="text-center font-bold text-red-500 uppercase p-1">{Nombre}</h3>
      </div>
      <div className="text-sm text-gray-600 font-semibold">
        <p>Unidades: {Unidades}</p>
        <p>Precio Unitario: RD$ {parseFloat(Precio).toFixed(2)}</p>
        <p>SubTotal: RD$ {parseFloat((generateNewPrice(Precio, Descuento) * Unidades)).toFixed(2)}</p>
        <p>Color: {Color}</p>
        <p>Size: {Size}</p>
        <p>Descuento: {Descuento}%</p>
      </div>
    </div>
  )
}
