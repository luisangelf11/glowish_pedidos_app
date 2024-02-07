import axios from "axios"

export const getSizes =async (limit, offset)=>
    await axios.get(`http://localhost:3000/api/v1/sizes?limit=${limit}&offset=${offset}`)

export const getFilterSizes =async(id_producto)=>
    await axios.get (`http://localhost:3000/api/v1/sizes?id_producto=${id_producto}`)

export const createSize = async(data, token)=>
    await axios.post(`http://localhost:3000/api/v1/sizes?accessToken=${token}`, data)

 export const deleteSize = async(id, token)=>
    await axios.delete(`http://localhost:3000/api/v1/sizes/${id}?accessToken=${token}`)

export const getSize = async(id)=>
    await axios.get(`http://localhost:3000/api/v1/sizes/${id}`)

export const updateSize = async(id, data, token)=>
    await axios.put(`http://localhost:3000/api/v1/sizes/${id}?accessToken=${token}`, data)
