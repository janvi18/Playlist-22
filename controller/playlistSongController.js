const validator = require("validator")
const playlistSongModel = require("../model/playlistSongModel")

let songs = []

// POST

module.exports.addSong = function (req, res) {
    let title = req.body.title
    let movieName = req.body.movieName
    let yearOfRelease = req.body.yearOfRelease
    let singer = req.body.singer

    let information = new playlistSongModel({
        "title": title,
        "movieName": movieName,
        "yearOfRelease": yearOfRelease,
        "singer": singer
    })
    let isError = false
    let errorMsg = []

    if (title == undefined || title.trim().length == 0) {
        isError = true
        errorMsg.push({
            "titleError": "Please Enter title"
        })
    }
    if (movieName == undefined || movieName.trim().length == 0) {
        isError = true
        errorMsg.push({
            "movieNameError": "Please Enter movieName"
        })
    }
    if (yearOfRelease == undefined || yearOfRelease.trim().length == 0) {
        isError = true
        errorMsg.push({
            "yearOfReleaseError": "Please Enter yearOfRelease"
        })
    }
    if (singer == undefined || singer.trim().length == 0) {
        isError = true
        errorMsg.push({
            "singerError": "Please Enter singer"
        })
    }
    if (isError == true) {
        res.json({
            "status": -1,
            "data": errorMsg,
            "msg": "Please Solve Error"
        })
    }
    else {

        information.save(function (err, data) {
            if (err) {
                res.json({
                    "status": -1,
                    "data": err,
                    "msg": "Something went Wrong.."
                })
            }
            else {
                res.json({
                    "status": 200,
                    "data": data,
                    "msg": "Song Added Successfull!!"
                })
            }
        })
    }
}

//get method -->GET [ read or list out the data ]
module.exports.getAllPlaylist = function (req, res) {
    playlistSongModel.find(function (err, data) {
        if (err) {
            console.log(err)
            res.json({
                "status": -1,
                "data": err,
                "msg": "Something went Wrong...."
            })
        }
        else {
            res.json({
                "status": 200,
                "data": data,
                "msg": "Information Retrived!!"
            })
        }
    })
}

//update
module.exports.updatePlaylist = function (req, res) {
    let playlistId = req.body.playlistId
    let title = req.body.title
    let movieName = req.body.movieName


    let isError = false
    let err = []

    if (title != undefined) {
        if (validator.isAlpha(title) == false || title.trim().length == 0) {
            isError = true;
            err.push({
                "title Error": "Please Enter title"
            })
        }
    }
    if (movieName != undefined) {
        if (validator.isAlpha(title) == false || title.trim().length == 0) {
            isError = true;
            err.push({
                "movieNameError": "Please Enter MovieName"
            })
        }
    }

    if (isError == true) {

        res.json({
            "status": -1,
            "data": err,
            "msg": "Something went Wrong...."
        })
    }
    else {
        playlistSongModel.updateOne({ _id: playlistId }, { title: title, movieName: movieName }, function (err, data) {
            if (err) {
                res.json({
                    "status": -1,
                    "data": err,
                    "msg": "Something went Wrong...."
                })
            }
            else {
                res.json({
                    "status": 200,
                    "data": data,
                    "msg": "Playlist Updated!!"
                })
            }
        })
    }
}



//delete playlist
module.exports.deletePlaylist = function (req, res) {
    let playlistId = req.body.playlistId
    playlistSongModel.deleteOne({ _id: playlistId }, function (err, data) {
        if (err) {
            console.log(err)
            res.json({
                "status": -1,
                "data": err,
                "msg": "Somethong went Wrong...."
            })
        }
        else {
            res.json({
                "status": 200,
                "data": data,
                "msg": "Playlist Deleted!!"
            })
        }
    })
}
