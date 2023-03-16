import express from 'express'

const router = express.Router();

const userRoute = app => {
    router.get('/auth', (req, res)=>{
        res.send("Hô le auth")
    })

    return app.use('/api/v1', router)
}

export default userRoute;