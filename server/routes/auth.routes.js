const Router = require("express");
const router = new Router();
const passport = require("passport")
const authController = require("../controllers/authController");

router.get('/login/success', authController.success);
router.get("/login/failed", authController.failed);
router.get("/isauth", authController.isAuth);
router.get("/users", authController.getAllUsers);
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"], keepSessionInfo: true }));
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}`,
    failureRedirect: "/api/auth/login",
    keepSessionInfo: true,
}))

router.put("/users/:userId", authController.update)

router.get("/logout", authController.logoutUser);


module.exports = router;