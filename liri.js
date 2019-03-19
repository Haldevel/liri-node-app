require("dotenv").config();

var Spotify = require('node-spotify-api');

// Load the NPM Package inquirer
var inquirer = require("inquirer");

var keys = require("./keys.js");

// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
        {
            message: "Select from the list:",
            type: "list",
            name: "actions",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]

        },
    ])
    .then(function (inquirerResponse) {
        if (inquirerResponse.actions === "concert-this") {
            console.log("bands")
        }
        else if (inquirerResponse.actions === "spotify-this-song") {
            console.log("spotify");
            //get a song name from a user
            inquirer.prompt([
                {
                    type: "input",
                    message: "What song do you want to spotify?",
                    name: "song",
                    default: "The Sign Ace of Base"

                },
            ])
                .then(function (inquirerResponse) {

                    console.log("Spotifying Song " + inquirerResponse.song);
                    runSpotify(inquirerResponse.song);

                });

        }
        else if (inquirerResponse.actions === "movie-this") {
            console.log("movie-this");

            // Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
            var axios = require("axios");

            // Then run a request with axios to the OMDB API with the movie specified
            axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy")
                .then(
                    function (response) {
                        console.log("The movie's rating is: " + response.data.imdbRating);
                    }
                );


        }
        else if (inquirerResponse.actions === "do-what-it-says") {
            // import fs
            var fs = require("fs");
            var randomInput;

            // we will read from randon.txt
            fs.readFile("random.txt", "utf8", function (error, data) {

                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }

                // We will then print the contents of data
                console.log(data);

                // Then split it by commas (to make it more readable)
                var dataArr = data.split(",");

                runSpotify(dataArr[1]);

                /* for(var i = 0; i < dataArr.length; i++) {
                    var separ = dataArr[i].split(",");
                    if(separ[0] === "spotify-this-song") {
                        randomInput = separ[1];
                    }
                }
                */

            });
        }
    });



function runSpotify(songName) {
    var spotify = new Spotify(keys.spotify);
    //get three songs
    spotify.search({ type: 'track', query: songName, limit: 3 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //retrieve data for 3 songs
        for (var i = 0; i < 3; i++) {
            console.log("--------------------------------------------------------------------------------");
            console.log("Song # " + (i+1));
            console.log("--------------------------------------------------------------------------------");
            console.log("Artist: " + JSON.stringify(data.tracks.items[i].album.artists[0].name, null, 2));
            console.log("Name: " + JSON.stringify(data.tracks.items[i].name, null, 2));
            console.log("Preview URL: " + JSON.stringify(data.tracks.items[i].preview_url, null, 2));
            console.log("Album: " + JSON.stringify(data.tracks.items[i].album.name, null, 2));
            console.log("--------------------------------------------------------------------------------");
        }
    });
}










