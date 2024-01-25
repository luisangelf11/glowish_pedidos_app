import axios from 'axios'

export const getTopFive =async()=>
   await axios.get(`http://localhost:3000/api/v1/dashboard/chart`);