import axios from "axios"

export const getSizes =async (limit, offset)=>
    await axios.get(`http://localhost:3000/api/v1/sizes?limit=${limit}&offset=${offset}`)

export const getFilterSizes =async(id_producto)=>
    await axios.get (`http://localhost:3000/api/v1/sizes?id_producto=${id_producto}`)