const Router = require("express");
const router = new Router();
const authRouter = require("./auth.routes");
const noteRouter = require("./note.routes");
const userRouter = require("./user.routes");

router.use("/auth", authRouter);
router.use("/notes", noteRouter);
router.use("/users", userRouter)

module.exports = router