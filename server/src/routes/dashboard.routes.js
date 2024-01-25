import { Router } from 'express'
import { besthUsers, chartFiveProducts, dateMoreOrders, ordersStatus, productsColumnDashboard } from '../controllers/dashboard.controllers.js';
import { validateToken } from '../auth/authentication.js'

//Initialization
const router = Router();

//Endpoint for get the 5 products with more orders
router.get('/api/v1/dashboard/chart', chartFiveProducts);

//Endpoint for get the orders with state "SEND" and "DELIVERED"
router.get('/api/v1/dashboard/orders-state', ordersStatus);

//Endpoint for get the top 5 users more actives with orders
router.get('/api/v1/dashboard/top-users', besthUsers);

//Endpoint for get the top 5 date with more orders
router.get('/api/v1/dashboard/top-date-orders', dateMoreOrders);

//Endpoint for get the price and units 
router.get('/api/v1/dashboard/product-columns', productsColumnDashboard);

export default router;