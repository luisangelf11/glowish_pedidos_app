import { Router } from 'express'
import { createSize, deleteSize, getSize, getSizes, updateSize } from '../controllers/router.controllers.js';

//Initializations
const router = Router();

//Endpoint for get all sizes
router.get('/api/v1/sizes', getSizes);

//Endpoint for get a size 
router.get('/api/v1/sizes/:id', getSize);

//Endpoint for create a new size
router.post('/api/v1/sizes', createSize);

//Endpoint for update a size
router.put('/api/v1/sizes/:id', updateSize);

//Endpoint for delete a size
router.delete('/api/v1/sizes/:id', deleteSize);

export default router;