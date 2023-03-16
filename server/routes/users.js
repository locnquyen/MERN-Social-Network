import express from 'express'
import { updateUser, deleteUser, getUser, followUser, unFollowUser } from '../controllers/userController.js';

const router = express.Router();

const userRoute = app => {
    router.put('/:id', updateUser);
    router.delete('/:id', deleteUser);
    router.get('/:id', getUser);
    router.put('/:id/follow', followUser);
    router.put('/:id/unfollow', unFollowUser);

    return app.use('/api/v1/users', router)
}

export default userRoute;