import { Router } from 'express'
import { createSize, deleteSize, getSize, getSizeDisponibles, getSizes, updateSize } from '../controllers/sizes.controllers.js';
import { validateToken } from '../auth/authentication.js';

//Initializations
const router = Router();

//Endpoint for get all sizes
router.get('/api/v1/sizes', getSizes);

//Endpoint for get a size 
router.get('/api/v1/sizes/:id', getSize);

//Enpoint fro get all sizes for a product with units
router.get(`/api/v1/sizes-disponible`, getSizeDisponibles);

//Endpoint for create a new size
router.post('/api/v1/sizes', validateToken, createSize);

//Endpoint for update a size
router.put('/api/v1/sizes/:id', validateToken, updateSize);

//Endpoint for delete a size
router.delete('/api/v1/sizes/:id', validateToken, deleteSize);

export default router;