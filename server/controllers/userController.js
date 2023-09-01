const User = require("../models/user");

class userController {
    async getAllUsers(req, res) {
        try {
            const collection = await User.find();
            return res.status(200).json(collection)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Can not get user" })
        }
    }

    async getOneUser(req, res) {
        try {
            const userId = req.user._id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: `User with id ${userId} not found` })
            }
            
            return res.status(200).json(user);
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Error in getOneUser" })
        }
    }

    async removeUser(req, res) {
        try {
            const { userId } = req.params;
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: `User with id ${userId} not found` })
            }
            return res.status(200).json({ message: `User id ${userId} was deleted` })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Can not delete user" })
        }
    }

    async updateUser(req, res) {
        try {
            const { userId } = req.params;
            const userData = req.body;
            const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: `User with id ${id} not found` })
            }
            return res.status(200).json(updatedUser)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error in user updating" })
        }
    }

    async addNoteInList(req, res) {
        try {
            const userId  = req.user._id;
            const user = await User.findById(userId);
            if (!user){return res.status(404).json({message: `User with id ${userId} not found`})};
            const {noteId} = req.body;
            if (!noteId) {return res.status(405).json({message: "Note id is required"})};
            user.notes.push(noteId);
            await user.save();
            return res.status(200).json(user)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error in user updating" })
        }
    }

    async removeNoteFromList(req, res) {
        try {
            const userId  = req.user._id;
            const user = await User.findById(userId);
            if (!user){return res.status(404).json({message: `User with id ${userId} not found`})};
            const {noteId} = req.body;
            if (!noteId) {return res.status(405).json({message: "Note id is required"})};
            user.notes.pull(noteId);
            await user.save();
            return res.status(200).json(user)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error in user updating" })
        }
    }

}

module.exports = new userController();