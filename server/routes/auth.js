import express from 'express'
import { register, login } from '../controllers/authController.js';

const router = express.Router();

const authRoute = app => {
    router.post('/register', register);
    router.post('/login', login);
    return app.use('/api/v1', router)
}

export default authRoute;