import axios from 'axios'

export const getDetails = async(id_pedido)=>
    await axios.get(`http://localhost:3000/api/v1/detalle?id_pedido=${id_pedido}`);