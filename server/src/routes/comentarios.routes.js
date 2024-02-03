import { Router } from "express";
import { createComentario, deleteComentario, getComentario, getComentarios, uploadComentario } from "../controllers/comentarios.controllers.js";
import {validateToken} from '../auth/authentication.js'

//Initialization
const router = Router();

//Get all comments
router.get('/api/v1/comentarios', getComentarios);

//Get a comment
router.get('/api/v1/comentarios/:id', getComentario);

//Create a new comment
router.post('/api/v1/comentarios', validateToken,createComentario);

//Update a comment
router.put('/api/v1/comentarios/:id',validateToken, uploadComentario);

//Delete a comment
router.delete('/api/v1/comentarios/:id',validateToken, deleteComentario);

export default router;