import { Router } from 'express'
import { besthUsers, chartFiveProducts, dateMoreOrders, ordersStatus, productsColumnDashboard } from '../controllers/dashboard.controllers.js';
import { validateToken } from '../auth/authentication.js'

//Initialization
const router = Router();

//Endpoint for get the 5 products with more orders
router.get('/api/v1/dashboard/chart', validateToken, chartFiveProducts);

//Endpoint for get the orders with state "SEND" and "DELIVERED"
router.get('/api/v1/dashboard/orders-state', validateToken, ordersStatus);

//Endpoint for get the top 5 users more actives with orders
router.get('/api/v1/dashboard/top-users', validateToken, besthUsers);

//Endpoint for get the top 5 date with more orders
router.get('/api/v1/dashboard/top-date-orders', validateToken, dateMoreOrders);

//Endpoint for get the price and units 
router.get('/api/v1/dashboard/product-columns', validateToken, productsColumnDashboard);

export default router;