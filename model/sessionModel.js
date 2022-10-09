const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String
})

module.exports = mongoose.model("Session", sessionSchema)
