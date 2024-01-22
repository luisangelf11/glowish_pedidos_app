import axios from "axios";

export const getCategory = async (id) =>
    await axios.get(`http://localhost:3000/api/v1/categorias/${id}`);

export const getCategorys = async()=>
    await axios.get(`http://localhost:3000/api/v1/categorias`);