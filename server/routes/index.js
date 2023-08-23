const Router = require("express");
const router = new Router();
const authRouter = require("./auth.routes");
const noteRouter = require("./note.routes");

router.use("/auth", authRouter);
router.use("/notes", noteRouter);

module.exports = router