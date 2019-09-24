//Needed to use spotify npm
var Spotify = require('node-spotify-api');
//Needed to use Axios npm
const axios = require('axios');

//get user input and chose of npm
var npmChoice = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

switch (npmChoice) {
    case "spotify-this-song":
        spotify();
        break;
    case "axios":
        console.log("this is the axios npm");
        break;
    default:
        console.log("this is default");


}





function spotify() {
    var spotify = new Spotify({
        id: "88bd5d945750457695918e93b5ae3119",
        secret: "f3573810ce614fdba1dc491118a63073"
    });
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //get Artists Name
        console.log(data.tracks.items[0].artists[0].name);
        //get album name
        console.log(data.tracks.items[0].album.name);
        //Song name
        console.log(data.tracks.items[0].name);
        //song preview link
        console.log(data.tracks.items[0].preview_url);
    });

};