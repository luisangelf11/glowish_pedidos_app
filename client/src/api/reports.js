import axios from 'axios'

export const getProductReports = async()=>
    await axios.get(`http://localhost:3000/api/v1/productos`);