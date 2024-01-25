import React, { useEffect, useState } from 'react'
import { getProduct } from '../../api/products';
import {useAuthContext} from '../../context/authContext'

export default function CardProductFive({id}) {
  const [product, setProduct] = useState({});
  const {user} = useAuthContext();
  const getDataProduct = async()=>{
    try{
      const res = await getProduct(id);
      setProduct(res.data);
      console.log(res.data)
    }
    catch(err){
      console.error(err);
    }
  }
  useEffect(()=>{
    getDataProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='flex flex-col w-56 border rounded-sm mt-4 ml-4 bg-white' data-aos="fade-up">
     <img className='w-56 h-56 object-cover' src={product.Imagen} alt={product.Id}/>
      <h3 className='font-bold uppercase text-red-500 p-2'>{product.Nombre}</h3>
      <p className='text-sm p-1'>{product.Descripcion}</p>
      <p className='text-sm p-1'><span className='text-red-500 font-semibold'>Descuento: </span>{product.Descuento}%</p>
      <p className='text-sm p-1'><span className='text-red-500 font-semibold'>Disponibles:</span> {product.Unidades}</p>
      <p className='p-2'>$RD {product.Precio}</p>
      <div className='flex gap-2 justify-end p-2'>
        <button className='bg-red-500 p-2 rounded-sm text-sm text-white transition-all hover:bg-red-400'>Ver</button>
        {user !== null ? <button className='border-2 text-sm border-red-500 rounded-sm p-2 text-red-600 transition-all hover:bg-red-400'><i className="fa-solid fa-cart-plus"></i></button>: ''}
      </div>
    </div>
  )
}
