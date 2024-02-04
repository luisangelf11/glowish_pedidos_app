import axios from 'axios'

export const getTopFive = async () =>
   await axios.get(`http://localhost:3000/api/v1/dashboard/chart`);

export const orderStatus = async () =>
   await axios.get(`http://localhost:3000/api/v1/dashboard/orders-state`);

export const topUsers = async () =>
   await axios.get(`http://localhost:3000/api/v1/dashboard/top-users`);

export const topFiveDays = async () =>
   await axios.get(`http://localhost:3000/api/v1/dashboard/top-date-orders`);

export const productColumn = async () =>
   await axios.get(`http://localhost:3000/api/v1/dashboard/product-columns`);   