import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const updateUser = async (req, res) => {
    console.log("req.body", req.body)
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, 
                req.body,
            );
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }

    }
    else {
        return res.status(403).json("You can update only your account!");
    }
}

export const deleteUser = (req, res) => {

}
export const getUser = (req, res) => {

}
export const followUser = (req, res) => {

}

export const unFollowUser = (req, res) => {

}