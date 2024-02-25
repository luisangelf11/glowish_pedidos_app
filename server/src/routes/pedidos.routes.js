import { Router } from 'express'
import { createPedido, deletePedido, getPedido, getPedidoFecha, getPedidos, updatePedido } from '../controllers/pedidos.controllers.js';
import { validateToken } from '../auth/authentication.js'

//Initializations
const router = Router();

//Endpoint for get all orders
router.get('/api/v1/pedidos', getPedidos);

//Endpoint for get an order
router.get('/api/v1/pedidos/:id', getPedido);

//Endpoint for get orders with date
router.get('/api/v1/pedidos-fecha', getPedidoFecha);

//Endpoint for create a new order
router.post('/api/v1/pedidos', validateToken, createPedido);

//Endpoint for update an order
router.put('/api/v1/pedidos/:id', validateToken, updatePedido);

//Endpoint for delete an order
router.delete('/api/v1/pedidos/:id', validateToken, deletePedido);

export default router;