const { ObjectId } = require("mongodb")
const { Schema, model } = require("mongoose")
const  Note = require("./note");

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, },
    email: { type: String, unique: true, },
    googleId: { type: String },//if sign up via google
    avatar: { type: String },
    notes: { type: [ObjectId], ref: Note },
    role: {type: [String], default: ['user']}
})

module.exports = model("User", UserSchema)