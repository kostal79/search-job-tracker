const Router = require("express");
const userController = require("../controllers/userController");
const isAuthMiddleware = require("../middlewares/isAuthMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");
const router = new Router();

router.get('/all', isAdminMiddleware, userController.getAllUsers);
router.put('/addNote',isAuthMiddleware, userController.addNoteInList)
router.put('/removeNote',isAuthMiddleware, userController.removeNoteFromList)
router.get('/:userId', isAuthMiddleware, userController.getOneUser);
router.put('/:userId', isAdminMiddleware, userController.updateUser);
router.delete('/:userId',isAdminMiddleware, userController.removeUser);

module.exports = router;