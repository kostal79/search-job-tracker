const router = require("express").Router();
const { Passport } = require("passport");
const User = require("../models/user");

class authController {

    failed(req, res) {
        res.status(401).json({
            success: false,
            message: "Authentication failed",
        })
    }

    success(req, res) {
        res.status(200).json({
            success: true,
            message: 'Authentication successful',
            user: req.user,
        });
    }

    async logoutUser(req, res) {
        req.logout({keepSessionInfo: true}, function (err) {
            if (err) { return res.json(err) }
            // The response should indicate that the user is no longer authenticated.
            return res.json({ authenticated: req.isAuthenticated() });
        });
    }
    async isAuth(req, res) {
        console.log("req.isAuthenticated: ", req.isAuthenticated())
        if (req.isAuthenticated()) {
            const user = req.user;
            return res.json({ isAuthorized: true, user: user });
        } else {
            return res.json({ isAuthorized: false })
        }
    }

    async getAllUsers(req, res) {
        try {
            const allUsersCollection = await User.find();
            return res.status(200).json(allUsersCollection)
        } catch (error) {
            res.json({ message: "Can not get users" })
        }
    }

    async update(req, res) {
        try {
            const { userId } = req.params;
            const userData = req.body;
            const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true })
            if (!updatedUser) {
                return res.status(404).json({ message: `User whith id ${userId} not found` })
            }
            return res.status(201).json(updatedUser)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error in updating user" })
        }
    }
}

module.exports = new authController();