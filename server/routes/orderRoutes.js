import express from "express";
import Order from "../models/Order.js";
import { protectRoute, admin } from "../middleware/authMiddleware.js"
import expressAsyncHandler from 'express-async-handler';

const orderRoutes = express.Router();

const createOrder = expressAsyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, paymentDetails, shippingPrice, totalPrice, userInfo } = req.body

    if (orderItems && orderItems.length !== 0) {
        const order = new Order({
            orderItems,
            user: userInfo._id,
            username: userInfo.name,
            email: userInfo.email,
            shippingAddress,
            paymentMethod,
            paymentDetails,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } else {
        res.status(400)
        throw new Error(`no orders Item ${req}`)
    }
})

const getOrder = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        res.json(order)
    } else {
        res.status(404);
        throw new Error('Order not found')
    }
})

const getOrders = expressAsyncHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders)
    } catch (error) {
        res.status(404);
        throw new Error(`Order not found.\n Request -> ${req}.\n Error --> ${error}`)
    }
})

const deleteOrder = expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findByIdAndRemove(req.params.id)
        res.json(order)

    } catch (error) {
        res.status(404)
        throw new Error(`No Users found.\nRequest --> ${req}\nError --> ${error}`);
    }
})

orderRoutes.route('/').post(protectRoute, createOrder);
orderRoutes.route('/:id').get(protectRoute, getOrder);
orderRoutes.route('/:id').delete(protectRoute, admin, deleteOrder);
orderRoutes.route('/').get(protectRoute, admin, getOrders);

export default orderRoutes;