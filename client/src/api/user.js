/*eslint-disable no-unused-vars*/
import axios from 'axios'

export const login = async ({ email, password }) =>
    await axios.get(`http://localhost:3000/api/v1/signin?email=${email}&password=${password}`);

export const register = async (data) =>
    await axios.post(`http://localhost:3000/api/v1/usuarios`, data);

export const getUser = async (id) =>
    await axios.get(`http://localhost:3000/api/v1/usuarios/${id}`);

export const updateUser = async (id, data, token) =>
    await axios.put(`http://localhost:3000/api/v1/usuarios/${id}?accessToken=${token}`, data);

export const changePassword = async (id, data, token) =>
    await axios.put(`http://localhost:3000/api/v1/usuarios/${id}?newPassword=true&accessToken=${token}`, data);

export const getUsers = async (limit, offset) =>
    await axios.get(`http://localhost:3000/api/v1/usuarios?limit=${limit}&offset=${offset}`);   

export const getFilterUsers = async (correo) =>
    await axios.get(`http://localhost:3000/api/v1/usuarios?correo=${correo}`); 