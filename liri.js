require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var action = process.argv[2];
var userInput = process.argv[3];

switch (action) {
    case "concert-this":
        concertSearch(userInput);
        break;
    case "spotify-this-song":
        spotifySearch(userInput);
        break;
    case "movie-this":
        movieSearch(userInput);
        break;
    case "do-what-it-says":
        doIt(userInput);
        break;
    default:
        break;
}

function concertSearch() {
    var artist = userInput;
    axios
        .get(
            "https://rest.bandsintown.com/artists/" +
            artist +
            "/events?app_id=codingbootcamp"
        )
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

function spotifySearch(userInput) {

    // Default Song
    if (userInput === undefined) {var song = "The Sign";}
    else {var song = userInput;}

    //var song = userInput;

    spotify.search({ type: "track", query: song }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
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
        var date = moment(data.tracks.items[0].album.release_date).format(
            "MMMM DD, YYYY"
        );
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

function movieSearch() {
    // Default Movie
    if (userInput === undefined) {var movie = "mr+nobody";}
    else {var movie = userInput;}

    //var movie = userInput;

    axios
        .get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie)
        .then(function (response) {
            //console.log(response);
            //console.log(response.data);
            var title = response.data.Title;
            var year = response.data.Year;
            var runtime = response.data.Runtime;
            var rated = response.data.Rated;
            var genre = response.data.Genre;
            var country = response.data.Country;
            var language = response.data.Language;
            var director = response.data.Director;
            var actors = response.data.Actors;
            var plot = response.data.Plot;
            //console.log(response.data.Ratings);
            var ratingsArray = response.data.Ratings;

            // not all movies have ratings
            // you get an error message if you process an empty array
            // function below checks if array does not exist, is not an array, or is empty
            if (!Array.isArray(ratingsArray) || !ratingsArray.length) {
                var IMDBrating = "N/A";
                var rottenTomatoesRating = "N/A";
                var metacriticRating = "N/A";
            }
            //if the array is valid it will be processed
            else {
                var IMDBrating = response.data.Ratings[0].Value;
                var rottenTomatoesRating = response.data.Ratings[1].Value;
                var metacriticRating = response.data.Ratings[2].Value;
            }
            //var IMDBrating = response.data.Ratings[0].Value;
            //var rottenTomatoesRating = response.data.Ratings[1].Value;
            //var metacriticRating = response.data.Ratings[2].Value;
            var awards = response.data.Awards;

            //--------------------------- OUTPUT MESSAGE ---------------------------//
            console.log("----------------------------------------------------------");
            console.log("Here is some information for that movie:");
            console.log("Title: " + title);
            console.log("Year: " + year);
            console.log("Runtime: " + runtime);
            console.log("Rated: " + rated);
            console.log("Genre: " + genre);
            console.log("Country: " + country);
            console.log("Language: " + language);
            console.log("Director: " + director);
            console.log("Actors: " + actors);
            console.log("Plot: " + plot);
            console.log("IMDB Rating: " + IMDBrating);
            console.log("Rotten Tomatoes Rating: " + rottenTomatoesRating);
            console.log("Metacritic Rating: " + metacriticRating);
            console.log("Awards: " + awards);
            console.log("----------------------------------------------------------");
        })
        .catch(function (error) {
            console.log(error);
        });
}

function doIt(){
    fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        //console.log(data);
        //console.log(data.split(","));
        //input = data.split(",");
        //var action = input[0];
        //var userInput = input[1];
        //console.log(userInput);
        console.log(data.split(",")[1]);
        spotifySearch (data.split(",")[1]);
      });
}
