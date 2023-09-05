    const { Schema, model } = require("mongoose")

const NoteSchema = new Schema({
    company: { type: String, text: true},
    vacancy: { type: String, text: true},
    status: {
        type: String,
        enum: ["refused", "under review", "interview", "offer", "declined offer"],
        default: "under review"
    },
    contact: { type: String, text: true },
    comment: { type: String, text: true },
    created_at: { type: Date, default: Date.now() }
})

module.exports = model("Note", NoteSchema)