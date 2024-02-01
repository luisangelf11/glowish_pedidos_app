import {Router} from 'express'
import { avgRanking, createRanking, getRankings, updateRanking, validationRanking } from '../controllers/ranking.controller.js';
import { validateToken } from '../auth/authentication.js'

//Initializations
const router = Router();

//Get all ranking of a product
router.get('/api/v1/ranking', getRankings);

//Get AVG of a product
router.get('/api/v1/ranking-avg', avgRanking)

//ValidationRanking with id_ranking and id_producto
router.get('/api/v1/validation-ranking', validationRanking)

//Crate ranking
router.post('/api/v1/ranking', validateToken, createRanking);

//Update ranking
router.put('/api/v1/ranking/:id', validateToken, updateRanking);

export default router;