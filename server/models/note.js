    const { Schema, model } = require("mongoose")

const NoteSchema = new Schema({
    company: { type: String },
    vacancy: { type: String, },
    status: {
        type: String,
        enum: ["refused", "under review", "interview", "offer", "declined offer"],
        default: "under review"
    },
    contact: { type: String },//if sign up via google
    comment: { type: String },
    created_at: { type: Date, default: Date.now() }
})

module.exports = model("Note", NoteSchema)