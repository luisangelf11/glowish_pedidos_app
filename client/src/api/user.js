/*eslint-disable no-unused-vars*/
import axios from 'axios'

export const login = async ({ email, password }) => 
    await axios.get(`http://localhost:3000/api/v1/signin?email=${email}&password=${password}`);

export const register = async(data)=>
    await axios.post(`http://localhost:3000/api/v1/usuarios`, data);    

export const getUser = async(id)=>
    await axios.get(`http://localhost:3000/api/v1/usuarios/${id}`);    