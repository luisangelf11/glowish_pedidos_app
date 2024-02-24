import axios from "axios";

export const getProducts = async(limit, offset)=>
  await  axios.get(`http://localhost:3000/api/v1/productos?limit=${limit}&offset=${offset}`); 

export const getProduct =async(id)=>  
  await axios.get(`http://localhost:3000/api/v1/productos/${id}`); 

export const getProductCategorys =async(id_categoria)=>
  await axios.get(`http://localhost:3000/api/v1/productos-categoria?id_categoria=${id_categoria}`);  

export const getRandomProductFive = async()=>
  await axios.get(`http://localhost:3000/api/v1/productos-random`);  
  
export const filterProducts = async(name)=>
  await axios.get(`http://localhost:3000/api/v1/productos?name=${name}`); 

export const deleteProduct = async(id, token)=>
  await axios.delete(`http://localhost:3000/api/v1/productos/${id}?accessToken=${token}`);  

export const createProduct = async(data, token)=>
  await axios.post(`http://localhost:3000/api/v1/productos?accessToken=${token}`, data);

export const updateProduct = async(id, data, token)=>
  await axios.put(`http://localhost:3000/api/v1/productos/${id}?accessToken=${token}`, data);  