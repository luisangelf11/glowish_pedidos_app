import React, { useEffect, useState } from 'react'
import { getTopFive } from '../../api/dashboard';
import CardProductFive from './CardProductFive';

export default function TopFive() {
    const [data, setData] = useState([]);
    const getData =async()=>{
        try{
            const res = await getTopFive();
            setData(res.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getData();
    }, []);

  return (
    <section style={{
        backgroundColor: '#F5EEEE',
        height: 'auto',
        padding: '10px',
        width: '100%'
    }}>
        <h2 style={{
            letterSpacing: '10px'
        }} className=' text-left p-2 ml-10 text-xl font-semibold uppercase'>Top 5 de la semana</h2>
        <div className='flex gap-2'>
        {data.map((el, index)=> <CardProductFive key={index} id={el.id_producto}/>)}
        </div>
    </section>
  )
}
