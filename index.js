const express = require("express")
const mongoose = require("mongoose")

const loginContoller = require("./controller/loginController")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Login Api
app.get("/signup", loginContoller.getAllUsers)
app.post("/signup", loginContoller.signup)
app.post("/login", loginContoller.login)


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
