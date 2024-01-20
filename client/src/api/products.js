import axios from "axios";

export const getProducts = async(limit, offset)=>
  await  axios.get(`http://localhost:3000/api/v1/productos?limit=${limit}&offset=${offset}`); 

  
export const filterProducts = async(name)=>
  await axios.get(`http://localhost:3000/api/v1/productos?name=${name}`); 