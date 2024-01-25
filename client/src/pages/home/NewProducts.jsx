import React, {useState, useEffect} from 'react'
import CardProductFive from './CardProductFive';
import { getProducts } from '../../api/products';

export default function NewProducts() {
    const [data, setData] = useState([]);
    const getData =async()=>{
        try{
            const res = await getProducts(5, 0);
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
        height: 'auto',
        padding: '10px',
        width: '100%'
    }}>
        <h2 style={{
            letterSpacing: '10px'
        }} className=' text-left p-2 ml-10 text-xl font-semibold uppercase'>Top 5 de la semana</h2>
        <div className='flex  gap-2'>
        {data.map((el, index)=> <CardProductFive key={index} id={el.Id}/>)}
        </div>
    </section>
  )
}
