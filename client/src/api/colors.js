import axios from "axios";

export const getColors =async(limit, offset)=>
    await axios.get(`http://localhost:3000/api/v1/colores?limit=${limit}&offset=${offset}`);

export const getColor = async(id)=>
    await axios.get(`http://localhost:3000/api/v1/colores/${id}`);    

export const filterColors =async(id_producto)=>
    await axios.get(`http://localhost:3000/api/v1/colores?id_producto=${id_producto}`);   
    
export const createColor = async(data, token)=>
    await axios.post(`http://localhost:3000/api/v1/colores?accessToken=${token}`, data);  

export const updateColor = async(id, data, token)=>
    await axios.put(`http://localhost:3000/api/v1/colores/${id}?accessToken=${token}`, data);    
    
export const deleteColor =async(id, token)=>
    await axios.delete(`http://localhost:3000/api/v1/colores/${id}?accessToken=${token}`);    

export const getColorsDisponibles = async(id_producto)=>
    await axios.get(`http://localhost:3000/api/v1/colores-disponibles?id_producto=${id_producto}`);    