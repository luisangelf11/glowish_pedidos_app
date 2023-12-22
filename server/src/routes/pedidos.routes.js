import { Router } from 'express'
import { createPedido, deletePedido, getPedido, getPedidos, updatePedido } from '../controllers/pedidos.controllers.js';

//Initializations
const router = Router();

//Endpoint for get all orders
router.get('/api/v1/pedidos', getPedidos);

//Endpoint for get an order
router.get('/api/v1/pedidos/:id', getPedido);

//Endpoint for create a new order
router.post('/api/v1/pedidos', createPedido);

//Endpoint for update an order
router.put('/api/v1/pedidos/:id', updatePedido);

//Endpoint for delete an order
router.delete('/api/v1/pedidos/:id', deletePedido);

export default router;