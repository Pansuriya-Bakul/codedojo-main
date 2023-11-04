import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';


// @desc        Create new order
//@route        POST /api/orders
//@access       Private
const addOrderItems = asyncHandler( async (req, res) => {
   const {
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice
   } = req.body;
   if(orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
   } else {
    const order = new Order({
        orderItems: orderItems.map((x) => ({
            ...x, 
            learningPathId: x._id,
            _id: undefined
        })),
        userId: req.user._id,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
   }
});

// @desc        Get logged in user orders
//@route        GET /api/orders/myorders
//@access       Private
const getMyOrders = asyncHandler( async (req, res) => {
    const userProfile = await User.findById(req.user._id);
    const orders = await Order.find({ userId: userProfile._id })
    res.status(200).json(orders);
});

// @desc        Get order by Id
//@route        GET /api/orders/:orderId
//@access       Private
const getOrderById = asyncHandler( async (req, res) => {
   const order = await Order.findById(req.params.orderId).populate('userId', 'name email');

   if (order) {
    res.status(200).json(order);
   } else {
    res.status(404);
    throw new Error('Order item not found');
   }
});

// @desc        Update order to paid
//@route        PUT /api/orders/:orderId/pay
//@access       Private
const updateOrderToPaid = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.orderId);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };

        // Map order.orderItems to get the learningPathIds
        const newPurchases = order.orderItems.map((item, index) => (
            {learningPathId: item.learningPathId}
        ));

        // Add the new learningPathIds to what is already existing for the user
        const user = await User.findById(order.userId._id);
        let existingPurchases = user.purchases
        
        existingPurchases.push(...newPurchases)

        user.purchases = existingPurchases

        await user.save()
        
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);

    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc        Get all orders
//@route        GET /api/orders
//@access       Private/Admin
const getOrders = asyncHandler( async (req, res) => {
   const orders = await Order.find({}).populate('userId', 'id name');
   res.status(200).json(orders);
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    getOrders
};
