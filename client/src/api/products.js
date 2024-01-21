import axios from "axios";

export const getProducts = async(limit, offset, token)=>
  await  axios.get(`http://localhost:3000/api/v1/productos?accessToken=${token}&limit=${limit}&offset=${offset}`); 
  
export const filterProducts = async(name, token)=>
  await axios.get(`http://localhost:3000/api/v1/productos?name=${name}&accessToken=${token}`); 

export const deleteProduct = async(id, token)=>
  await axios.delete(`http://localhost:3000/api/v1/productos/${id}?accessToken=${token}`);  

export const createProduct = async(data, token)=>
  await axios.post(`http://localhost:3000/api/v1/productos?accessToken=${token}`, data);