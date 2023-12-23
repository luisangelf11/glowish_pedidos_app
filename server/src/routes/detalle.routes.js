import { Router } from 'express'
import { createDetalle, deleteDetalle, getDetalle, getDetalles, updateDetalle } from '../controllers/detalle.controllers.js';
import { validateToken } from '../auth/authentication.js'

//Initialization
const router = Router();

//Endpoint for get all details
router.get('/api/v1/detalle', validateToken, getDetalles);

//Endpoint for get a detail
router.get('/api/v1/detalle/:id', validateToken, getDetalle);

//Endpoint for create a new detail
router.post('/api/v1/detalle', validateToken, createDetalle);

//Endpoint for update a detail
router.put('/api/v1/detalle/:id', validateToken, updateDetalle);

//Endpoint for delete a detail
router.delete('/api/v1/detalle/:id', validateToken, deleteDetalle);

export default router;