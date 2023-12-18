import { Router } from "express";
import { createUsuario, deleteUsuario, getUsuario, getUsuarios, signIn, updateUsuario } from "../controllers/usuarios.controllers.js";
import { validateToken } from "../auth/authentication.js";

//Initialization
const router = Router();

//Endpoint for get all users
router.get('/api/v1/usuarios', validateToken, getUsuarios);

//Endpoint for get a user 
router.get('/api/v1/usuarios/:id', validateToken, getUsuario);

//Endpoint for create a new user
router.post('/api/v1/usuarios', validateToken, createUsuario);

//Endpoint for update a user
router.put('/api/v1/usuarios/:id', validateToken, updateUsuario);

//Endpoint for delete a user 
router.delete('/api/v1/usuarios/:id', validateToken, deleteUsuario);

//Endpoint for sign in 
router.get('/api/v1/signin', signIn);

export default router;