import { Router } from "express";
import { createComentario, deleteComentario, getComentario, getComentarios, uploadComentario } from "../controllers/comentarios.controllers.js";

//Initialization
const router = Router();

//Get all comments
router.get('/api/v1/comentarios', getComentarios);

//Get a comment
router.get('/api/v1/comentarios/:id', getComentario);

//Create a new comment
router.post('/api/v1/comentarios', createComentario);

//Update a comment
router.put('/api/v1/comentarios/:id', uploadComentario);

//Delete a comment
router.delete('/api/v1/comentarios/:id', deleteComentario);

export default router;