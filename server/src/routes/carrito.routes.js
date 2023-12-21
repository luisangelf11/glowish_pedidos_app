import { Router } from 'express';
import { createCarrito, deleteCarrito, getCarritos, updateCarrito } from '../controllers/carrito.controllers.js';

//Initializations
const router = Router();

//Endpoint for get all shopping cart
router.get('/api/v1/carrito', getCarritos);

//Endpoint for create a new shopping cart
router.post("/api/v1/carrito", createCarrito);

//Endpoint for update a shooping cart
router.put('/api/v1/carrito/:id', updateCarrito);

//Endpoint for delete a shopping cart
router.delete('/api/v1/carrito/:id', deleteCarrito);

export default router;