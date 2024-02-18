import {Router} from 'express'
import { createOrderCheckout } from '../controllers/checkout.controllers.js';

const router = Router();

router.post('/api/v1/pay', createOrderCheckout);

export default router;