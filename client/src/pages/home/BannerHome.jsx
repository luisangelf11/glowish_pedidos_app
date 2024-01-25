import React from 'react'
import imgBannerOne from '../../assets/homeImage1.png'
import imgBannerTwo from '../../assets/homeImage2.png'
import { Link } from 'react-router-dom'
import '../../assets/css/animation.css'

export default function BannerHome() {
  return (
    <section className='w-full flex justify-center items-center mt-2 scale-up-center'>
        <img className='w-80 object-cover' src={imgBannerTwo} alt="Image" />
        <div className='flex flex-col gap-4 items-center'>
            <h1 className='text-xl font-bold text-red-400 uppercase w-96 text-center'>Chicas, bienvenidas a su tienda virtual Glowish Fashion.</h1>
            <Link to='/catalogo' className='border-2 p-2 border-red-500 rounded-sm text-red-500 uppercase font-semibold text-sm hover:text-red-400 hover:border-red-400 transition-all'>Ordenar Ahora</Link>
        </div>
        <img className='w-80 object-cover' src={imgBannerOne} alt="Image" />
    </section>
  )
}
