import axios from 'axios'

export const getCarts = async(id_usuario, token)=>
    await axios.get(`http://localhost:3000/api/v1/carrito?id_usuario=${id_usuario}&accessToken=${token}`);

export const getCart = async(id, token)=>
    await axios.get(`http://localhost:3000/api/v1/carrito/${id}?accessToken=${token}`); 

export const getCartSelected =async(id_usuario, token)=>
    await axios.get(`http://localhost:3000/api/v1/carrito-seleccionado?id_usuario=${id_usuario}&accessToken=${token}`);    
    
export const createCart = async(data, token)=>
    await axios.post(`http://localhost:3000/api/v1/carrito?accessToken=${token}`, data);
    
export const updateCart =async(id, data, token)=>
    await axios.put(`http://localhost:3000/api/v1/carrito/${id}?accessToken=${token}`, data);    

export const deleteCart = async(id, token)=>
    await axios.delete(`http://localhost:3000/api/v1/carrito/${id}?accessToken=${token}`);    