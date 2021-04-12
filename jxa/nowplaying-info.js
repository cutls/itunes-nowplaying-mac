#!/usr/bin/osascript -l JavaScript
var app = Application.currentApplication()
app.includeStandardAdditions = true
var containerPath = Application('System Events').files[app.pathTo(this).toString()].container().posixPath()
var itunes = Application("iTunes")
var track = itunes.currentTrack
function run(argv) {
    var itunes = $.NSFileManager.defaultManager.fileExistsAtPath("/Applications/iTunes.app") ? Application("iTunes") : Application("Music")
    var track = itunes.currentTrack

    var state = itunes.playerState()
    if (state != "playing" && state != "paused") {
        return "null"
    }
    var existsArtwork = track.artworks.length > 0
    track = track.properties()
    Object.keys(track).forEach(function (name) {
        if (name.startsWith("purchase") || (name.endsWith("ID") && name != "databaseID")) {
            track[name] = undefined
        }
        try {
            if (name === "location") track[name] = track[name].toString()
        } catch(e) {
            // failed to extract location...
        }
    })
    track.state = state
    track.existsArtwork = existsArtwork
    if (argv.includes("-without-artworks")) {
        return JSON.stringify(track, null, 4)
    }

    if (existsArtwork) {
        track.artworks = app.runScript(Path(containerPath +"/itunes.scpt"))
    } else {
        track.artworks = []
    }
    return JSON.stringify(track, null, 4)
}