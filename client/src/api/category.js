import axios from "axios";

export const getCategory = async (id) =>
    await axios.get(`http://localhost:3000/api/v1/categorias/${id}`);

export const getCategorys = async()=>
    await axios.get(`http://localhost:3000/api/v1/categorias`);

export const filterCategorys = async(name)=>    
    await axios.get(`http://localhost:3000/api/v1/categorias?name=${name}`);

export const getCategorysLimit =async(limit, offset)=>
    await axios.get(`http://localhost:3000/api/v1/categorias?limit=${limit}&offset=${offset}`);    

export const createCategory = async(data, token)=>
    await axios.post(`http://localhost:3000/api/v1/categorias?accessToken=${token}`, data);
    
export const deleteCategory = async(id, token)=>
    await axios.delete(`http://localhost:3000/api/v1/categorias/${id}?accessToken=${token}`);  
    
export const updateCategory = async(id, data,token)=>
    await axios.put(`http://localhost:3000/api/v1/categorias/${id}?accessToken=${token}`, data);   