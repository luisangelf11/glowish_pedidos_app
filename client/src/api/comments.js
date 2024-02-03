import axios from "axios";

export const getCommentsForIdProduct =async(id, limit, offset)=>
    await axios.get(`http://localhost:3000/api/v1/comentarios?id_producto=${id}&limit=${limit}&offset=${offset}`);

export const createComment =async(data, token)=>
    await axios.post(`http://localhost:3000/api/v1/comentarios?accessToken=${token}`, data);

export const deleteComment =async(id, token)=>
    await axios.delete(`http://localhost:3000/api/v1/comentarios/${id}?accessToken=${token}`);    