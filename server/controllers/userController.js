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

export const deleteUser = async (req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }

}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log("user", user)
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
}


export const followUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            //current user
            const user = await User.findById(req.params.id);
            //friend user
            const currentUser = await User.findById(req.body.userId);

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ followers: req.body.userId });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("user has been followed");
            }
        } catch (err) {

        }
    }
}

export const unFollowUser = async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);

          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("user has been unfollowed");

          } else {
            res.status(403).json("you don't follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }
}