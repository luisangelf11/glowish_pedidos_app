import axios from 'axios'

export const getDetails = async(id_pedido)=>
    await axios.get(`http://localhost:3000/api/v1/detalle?id_pedido=${id_pedido}`);

export const createDetail = async(data, token)=>
    await axios.post(`http://localhost:3000/api/v1/detalle?accessToken=${token}`, data)    