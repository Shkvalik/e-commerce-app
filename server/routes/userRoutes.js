import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { protectRoute, admin } from "../middleware/authMiddleware.js"
import Order from '../models/Order.js';
import User from '../models/User.js';

const userRoutes = express.Router();

//generate token 
const genToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60d' });
};

const loginUser = expressAsyncHandler(async(req, res) => {
    const {email, password } = req.body
    const user = await User.findOne({ email })
    
    if(user && (await user.matchPasswords(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genToken(user._id),
            createdAt: user.createdAt,
        })
    } else {
        res.status(401).send('Invalid Email or Password');
        throw new Error('User not found.');
    }
})

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).send('We already have an account with that email address.');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genToken(user._id),
            createdAt: user.createdAt,
        });
    } else {
        res.status(400).send('We could not register you.');
        throw new Error('Something went wrong. Please check your data and try again.');
    }
});

const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: genToken(updatedUser._id),
            createdAt: updatedUser.createdAt,
        });
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
});
const getUserOrders = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.params.id})

    if (orders) {
        res.json(orders)
    } else {
        res.status(404)
        throw new Error(`No Orders found.\nRequest --> ${req}\orders --> ${orders}`);
    }
})
// admin methods
const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find()

    if (users) {
        res.json(users)
    } else {
        res.status(404)
        throw new Error(`No Users found.\nRequest --> ${req}\nUsers --> ${users}`);
    }
})

const deleteUser = expressAsyncHandler(async (req, res) => {
    try { 
    const user = await User.findByIdAndRemove(req.params.id)
    res.json(user)
        
    } catch (error) {
        res.status(404)
        throw new Error(`No Users found.\nRequest --> ${req}\nUser --> ${error}`);
    }
})
userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/profile/:id').put(protectRoute, updateUserProfile);
userRoutes.route('/:id').get(protectRoute, getUserOrders);
userRoutes.route('/').get(protectRoute, admin, getUsers);
userRoutes.route('/:id').delete(protectRoute, admin, deleteUser);

export default userRoutes;