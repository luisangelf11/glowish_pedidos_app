import axios from 'axios'

export const getOrders = async(limit, offset)=>
    await axios.get(`http://localhost:3000/api/v1/pedidos?limit=${limit}&offset=${offset}`);

export const getFilterOrders = async(id)=>
    await axios.get(`http://localhost:3000/api/v1/pedidos?id=${id}`);
    
export const updateOrder = async(id, data, token)=>
    await axios.put(`http://localhost:3000/api/v1/pedidos/${id}?accessToken=${token}`, data);    