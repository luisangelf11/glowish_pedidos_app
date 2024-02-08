import axios from 'axios'

export const getAVG = async(id)=>
    await axios.get(`http://localhost:3000/api/v1/ranking-avg?id_producto=${id}`);

export const validateRanking = async(id_producto, id_usuario)=>
    await axios.get(`http://localhost:3000/api/v1/validation-ranking?id_producto=${id_producto}&id_usuario=${id_usuario}`);

export const createRanking = async(data, token)=>
    await axios.post(`http://localhost:3000/api/v1/ranking?accessToken=${token}`, data);
    
export const updateRanking = async(id, data, token)=>
    await axios.put(`http://localhost:3000/api/v1/ranking/${id}?accessToken=${token}`, data);    