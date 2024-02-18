import axios from 'axios'

export const createOrderCheckout = async(data)=>
    await axios.post(`http://localhost:3000/api/v1/pay`, data)