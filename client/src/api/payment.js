import axios from 'axios'

export const createOrderCheckout = async()=>
    await axios.post(`http://localhost:3000/api/v1/pay`)