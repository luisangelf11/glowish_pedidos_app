import { Router } from 'express'
import { createDetalle, deleteDetalle, getDetalle, getDetalles, updateDetalle } from '../controllers/detalle.controllers.js';

//Initialization
const router = Router();

//Endpoint for get all details
router.get('/api/v1/detalle', getDetalles);

//Endpoint for get a detail
router.get('/api/v1/detalle/:id', getDetalle);

//Endpoint for create a new detail
router.post('/api/v1/detalle', createDetalle);

//Endpoint for update a detail
router.put('/api/v1/detalle/:id', updateDetalle);

//Endpoint for delete a detail
router.delete('/api/v1/detalle/:id', deleteDetalle);

export default router;