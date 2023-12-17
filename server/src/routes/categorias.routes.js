import { Router } from 'express';
import { createCategoria, deleteCategoria, getCategoria, getCategorias, updateCategoria } from '../controllers/categorias.controllers.js';

//Initialization of router
const router = Router();

//Endpoint for get all categorias
router.get('/api/v1/categorias', getCategorias);

//Endpoint for get a categoria
router.get('/api/v1/categorias/:id', getCategoria);

//Endpoint for create a new categoria
router.post('/api/v1/categorias', createCategoria);

//Endpoint for update a categoria
router.put('/api/v1/categorias/:id', updateCategoria);

//Endpoint for delete a categoria
router.delete('/api/v1/categorias/:id', deleteCategoria);

export default router;