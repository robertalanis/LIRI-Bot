require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
    case "concert-this":
        concertSearch(value);
        break;
    case "spotify-this-song":
        spotifySearch(value);
        break;
    case "movie-this":
        movieSearch(value);
        break;
    default:
        break;
}

function concertSearch(artist) {
    var artist = value;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            //console.log(response);
            //console.log(response.data[0]);
            //console.log(response.data[0].artist);
            var artist = response.data[0].artist.name;
            //console.log(response.data[0].venue);
            var venue = response.data[0].venue.name;
            var city = response.data[0].venue.city;
            var country = response.data[0].venue.country;
            var date = moment(response.data[0].datetime).format("MMMM DD, YYYY");

            //--------------------------- OUTPUT MESSAGE ---------------------------//
            console.log("----------------------------------------------------------");
            console.log("Here is the information for " + artist + "'s next concert:");
            console.log("Date: " + date);
            console.log("Venue: " + venue);
            console.log("Location: " + city + ", " + country);
            console.log("----------------------------------------------------------");
        })
        .catch(function (error) {
            console.log(error);
        });
}

function spotifySearch() {
    var song = value;

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console.log(data); 
        //console.log(data);
        //console.log(data.tracks);
        //console.log(data.tracks.items);
        //console.log(data.tracks.items[0]);
        var song = data.tracks.items[0].name;
        //console.log(data.tracks.items[0].artists);
        //var artistNumber = data.tracks.items[0].artists.length;
        var artists = data.tracks.items[0].artists[0].name;
        // NEED TO SOLVE FOR MULTIPLE ARTISTS
        //console.log(data.tracks.items[0].album);
        var album = data.tracks.items[0].album.name;
        var date = moment(data.tracks.items[0].album.release_date).format("MMMM DD, YYYY");
        var previewURL = data.tracks.items[0].preview_url;

        //--------------------------- OUTPUT MESSAGE ---------------------------//
        console.log("----------------------------------------------------------");
        console.log("Here's some info on that song:");
        console.log("Song : " + song);
        console.log("Artist : " + artists);
        console.log("Album : " + album);
        console.log("Release date : " + date);
        console.log("Preview : " + previewURL);
        console.log("----------------------------------------------------------");
    });

}