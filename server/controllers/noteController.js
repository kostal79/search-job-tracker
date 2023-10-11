const Note = require("../models/note");

class noteController {
    async getAllNotes(req, res) {
        try {
            const user = req.user;
            const { status, selectedField, sortOrder, dateInterval } = req.query;
            console.log(req.query)
            const query = {};
            let sortRule = null;
            if (status && status === "all") {
                
            }
            else if (status && status === "active") {
                query["status"] = { $in: ["under review", "interview", "offer"] };
            } else if (status && status === "finished") {
                query["status"] = { $in: ['refused', 'declined offer'] };
            }
            if (dateInterval) {
                query["created_at"] = { $gte: dateInterval.from, $lt: dateInterval.to };
            }
            console.log(query)
            if (selectedField && sortOrder) {
                sortRule = {[selectedField] : sortOrder}
            }
            const notes = await Note.find({ _id: { $in: user.notes }, ...query })
                .sort(sortRule)
            return res.status(200).json({ notes })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Can not get notes" })
        }
    }

    async getOneNote(req, res) {
        try {
            const { noteId } = req.params;
            if (!noteId) {
                return res.status(403).json({ message: `Note id is required ${noteId} received` })
            }
            const note = await Note.findById(noteId);
            if (!note) {
                return res.status(404).json({ message: `Note with id ${noteId} not found` })
            }
            return res.status(200).json(note);
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Error in getOneNote" })
        }
    }

    async createNote(req, res) {
        try {
            const noteData = req.body;
            const newNote = await Note.create(noteData);
            return res.status(201).json(newNote)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Can not create note" })
        }
    }

    async deleteNote(req, res) {
        try {
            const { noteId } = req.params;
            const deletedNote = await Note.findByIdAndDelete(noteId);
            if (!deletedNote) {
                return res.status(404).json({ message: `Note with id ${noteId} not found` })
            }
            return res.status(200).json({ message: `Note id ${noteId} was deleted` })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Can not delete node" })
        }
    }

    async updateNote(req, res) {
        try {
            const { noteId } = req.params;
            const noteData = req.body;
            const updatedNote = await Note.findByIdAndUpdate(noteId, noteData, { new: true });
            if (!updatedNote) {
                return res.status(404).json({ message: `Note with id ${id} not found` })
            }
            return res.status(200).json(updatedNote)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error in note updating" })
        }
    }

}

module.exports = new noteController();