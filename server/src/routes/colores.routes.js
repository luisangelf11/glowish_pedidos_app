import { Router } from 'express'
import { createColor, deleteColor, getColor, getColorDisponibles, getColores, updateColor } from '../controllers/colores.controllers.js';
import { validateToken } from '../auth/authentication.js'

//Initializations
const router = Router();

//Endpoint for get all colors
router.get('/api/v1/colores', getColores);

//Endpoint for get a color
router.get('/api/v1/colores/:id', getColor);

//Enpoint for get all colors of a producto
router.get('/api/v1/colores-disponibles', getColorDisponibles);

//Endpoint for create a new color
router.post('/api/v1/colores', validateToken, createColor);

//Endpoint for update a color
router.put('/api/v1/colores/:id', validateToken, updateColor);

//Endpoint for delete a color
router.delete('/api/v1/colores/:id', validateToken, deleteColor);

export default router;