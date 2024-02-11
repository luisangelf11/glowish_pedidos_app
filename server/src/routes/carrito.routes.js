import { Router } from 'express';
import { createCarrito, deleteCarrito, getCarrito, getCarritos, updateCarrito } from '../controllers/carrito.controllers.js';
import { validateToken } from '../auth/authentication.js'

//Initializations
const router = Router();

//Endpoint for get all shopping cart
router.get('/api/v1/carrito', validateToken, getCarritos);

//Endpoint for get a shopping cart
router.get(`/api/v1/carrito/:id`, validateToken, getCarrito);

//Endpoint for create a new shopping cart
router.post("/api/v1/carrito", validateToken, createCarrito);

//Endpoint for update a shooping cart
router.put('/api/v1/carrito/:id', validateToken, updateCarrito);

//Endpoint for delete a shopping cart
router.delete('/api/v1/carrito/:id', validateToken, deleteCarrito);

export default router;