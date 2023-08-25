const router = require("express").Router();
const User = require("../models/user");

class authController {

    async logoutUser(req, res) {
        req.logout({keepSessionInfo: true}, function (err) {
            if (err) { return res.json(err) }
            // The response should indicate that the user is no longer authenticated.
            return res.json({ authenticated: req.isAuthenticated() });
        });
    }
    async isAuth(req, res) {
        if (req.isAuthenticated()) {
            const user = req.user;
            return res.json({ isAuthorized: true, user: user });
        } else {
            return res.json({ isAuthorized: false })
        }
    }
}

module.exports = new authController();