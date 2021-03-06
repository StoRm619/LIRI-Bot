//Needed to use spotify npm
var Spotify = require('node-spotify-api');
//Needed to use Axios npm
const axios = require('axios');
//needed to use momentjs
var moment = require('moment');
//needed to use fs package
var fs = require("fs");

require("dotenv").config();
var keys = require("./keys.js");

//get user input and chose of npm
var npmChoice = process.argv[2];
var userInput = process.argv.slice(3).join(" ");


function fsRead() {
    fs.readFile("random.txt", "utf8", function(error, data) {


        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        userInput = dataArr[1];
        spotifyThis();

    });


};

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
            function(response) {
                console.log("Venue: " + response.data[0].venue.name);
                console.log("Venue location: " + response.data[0].venue.city + "," + response.data[0].venue.country);
                console.log("Date of event: " + moment(response.data[0].datetime).format('L'));
            })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

};

function movie() {
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
            function(response) {
                console.log("Movie Title: " + response.data.Title);
                console.log("Year realase: " + response.data.Year);
                console.log("The movie's rating is: " + response.data.imdbRating);
                console.log("Rotten tomatoes rating: " + response.data.Ratings[1].Value);
                console.log("Country production: " + response.data.Country);
                console.log("language: " + response.data.Language);
                console.log("plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors)
            })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};


function spotifyThis() {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //get Artists Name
        console.log("Artists Name " + data.tracks.items[0].artists[0].name);
        //get Album name
        console.log("Album name " + data.tracks.items[0].album.name);
        //Song name
        console.log("Song name " + data.tracks.items[0].name);
        //song preview link
        console.log("song preview link " + data.tracks.items[0].preview_url);
    });

};
switch (npmChoice) {
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movie();
        break;
    case "concert-this":
        concert();
        break;
    case "do-what-it-says":
        fsRead();
        break;
    default:
        console.log("this is default");

}