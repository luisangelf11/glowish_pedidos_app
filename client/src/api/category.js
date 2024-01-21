import axios from "axios";

export const getCategory = async (id, token) =>
    await axios.get(`http://localhost:3000/api/v1/categorias/${id}?accessToken=${token}`);

export const getCategorys = async(token)=>
    await axios.get(`http://localhost:3000/api/v1/categorias?accessToken=${token}`);