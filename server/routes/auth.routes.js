const Router = require("express");
const router = new Router();
const passport = require("passport")
const authController = require("../controllers/authController");

router.get("/isauth", authController.isAuth);
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"], keepSessionInfo: true }));
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}`,
    failureRedirect: "/api/auth/google",
    keepSessionInfo: true,
}))
router.get("/logout", authController.logoutUser);


module.exports = router;