import {Router} from 'express'
import { createColor, deleteColor, getColor, getColores, updateColor } from '../controllers/colores.controllers.js';

//Initializations
const router = Router();

//Endpoint for get all colors
router.get('/api/v1/colores', getColores);

//Endpoint for get a color
router.get('/api/v1/colores/:id', getColor);

//Endpoint for create a new color
router.post('/api/v1/colores', createColor);

//Endpoint for update a color
router.put('/api/v1/colores/:id', updateColor);

//Endpoint for delete a color
router.delete('/api/v1/colores/:id', deleteColor);

export default router;