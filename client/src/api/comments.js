import axios from "axios";

export const getCommentsForIdProduct =async(id)=>
    await axios.get(`http://localhost:3000/api/v1/comentarios?id_producto=${id}`);

export const createComment =async(data, token)=>
    await axios.post(`http://localhost:3000/api/v1/comentarios?accessToken=${token}`, data);