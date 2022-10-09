const mongoose = require("mongoose")

const playlistSchema = new mongoose.Schema({
    title: String,
    movieName: String,
    yearOfRelease: String,
    singer: String
})

module.exports = mongoose.model("Playlist", playlistSchema)
