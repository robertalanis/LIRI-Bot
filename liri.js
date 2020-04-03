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
        getBands(value);
        break;
    default:
        break;
}

function getBands(artist) {
    var artist = value;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      .then(function (response) {
        //console.log(response);
        //console.log(response.data[0]);
        //console.log(response.data[0].venue);
        //console.log(response.data[0].artist);
        var artist = response.data[0].artist.name;
        var venue = response.data[0].venue.name;
        var city = response.data[0].venue.city;
        var country = response.data[0].venue.country;
        var date = moment(response.data[0].datetime).format("MMMM DD, YYYY");

        console.log("----------------------------------------------------------");
        console.log("Here is the information for " + artist + "'s next concert:");
        console.log("Date: " +date);
        console.log("Venue: " + venue);
        console.log("Location: " + city + ", " + country);
        console.log("----------------------------------------------------------");
      })
      .catch(function (error) {
        console.log(error);
      });
  }