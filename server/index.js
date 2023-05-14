
import express from 'express'; import dotenv from 'dotenv';
import cors from 'cors'

import ConnectToDataBase from './db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Use this after the variable declaration
dotenv.config();
ConnectToDataBase();


const app = express();
app.use(express.json())
app.use(cors())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server run at port ${port}`)
})
