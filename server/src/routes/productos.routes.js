import { Router } from 'express'
import { createProducto, deleteProducto, getProducto, getProductos, updateProducto } from '../controllers/productos.controllers.js';

//Initializations
const router = Router();

//Endpoint for get products (pagination is active)
router.get('/api/v1/productos', getProductos);

//Endpoint for get a product
router.get('/api/v1/productos/:id', getProducto);

//Endpoint for create a new product
router.post('/api/v1/productos', createProducto);

//Endpoint for update a product
router.put('/api/v1/productos/:id', updateProducto);

//Endpoint for delete a product
router.delete('/api/v1/productos/:id', deleteProducto);

export default router;