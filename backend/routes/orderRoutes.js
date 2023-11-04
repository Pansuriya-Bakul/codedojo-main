import express from 'express';
import { 
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    getOrders
 } from '../controllers/orderController.js';
 import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

router.route('/mine').get(protect, getMyOrders);

router.route('/:orderId').get(protect, getOrderById);

router.route('/:orderId/pay').put(protect, updateOrderToPaid);

export default router;