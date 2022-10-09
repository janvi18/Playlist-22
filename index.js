const express = require("express")
const mongoose = require("mongoose")

const sessionController = require("./controller/sessionController")
const playlistController = require("./controller/playlistSongController")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Session Api
app.get("/signup", sessionController.getAllUsers)
app.post("/signup", sessionController.signup)
app.post("/login", sessionController.login)

//playlist Api
app.get("/playlist",playlistController.getAllPlaylist)
app.post("/playlist",playlistController.addSong)
app.put("/playlist",playlistController.updatePlaylist)
app.delete("/playlist",playlistController.deletePlaylist)



const localDb = "mongodb://localhost/playlist-22";

mongoose.connect(localDb, function (err) {
    if (err) {
        console.log(err)
        console.log("Something Went Wrong....")
    }
    else {
        console.log("db Connected")
    }
})

app.listen(3000, function () {
    console.log("Server Started 3000");
})
