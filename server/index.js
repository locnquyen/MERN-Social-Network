import express from 'express'
const app = express()
const port = 8080

import dotenv from 'dotenv';
import helmet from 'helmet';

import morgan from 'morgan';
import mongoose from 'mongoose';

import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Database connection successful')
    })
    .catch(err => {
        console.error('Database connection error')
    })

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//init router
userRoute(app);
authRoute(app);


app.listen(port, () => {
    console.log(`API working port ${port}`)
})