import { Router } from 'express'
import { createProducto, deleteProducto, getProducto, getProductos, getProductsCategorys, updateProducto } from '../controllers/productos.controllers.js';
import { validateToken } from '../auth/authentication.js';

//Initializations
const router = Router();

//Endpoint for get products (pagination is active)
router.get('/api/v1/productos',getProductos);

//Endpoint for get a product
router.get('/api/v1/productos/:id', getProducto);

//Endpoint for get all products of a category
router.get('/api/v1/productos-categoria', getProductsCategorys);

//Endpoint for create a new product
router.post('/api/v1/productos', validateToken, createProducto);

//Endpoint for update a product
router.put('/api/v1/productos/:id', validateToken, updateProducto);

//Endpoint for delete a product
router.delete('/api/v1/productos/:id', validateToken, deleteProducto);

export default router;