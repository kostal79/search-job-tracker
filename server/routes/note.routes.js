const Router = require("express");
const router = new Router();
const passport = require("passport")
const noteController = require("../controllers/noteController");

router.get("/all", noteController.getAllNotes);
router.get("/:noteId", noteController.getOneNote)
router.post("/create", noteController.createNote)
router.delete("/:noteId", noteController.deleteNote)
router.put("/:noteId", noteController.updateNote)


module.exports = router;