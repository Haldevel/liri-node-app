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

                    //connect to spotify api and get the data for 3 top songs

                    var spotify = new Spotify(keys.spotify);  
                    
                    //get three songs
                    spotify.search({ type: 'track', query: inquirerResponse.song, limit: 3 }, function (err, data) {
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                    
                        //retrieve data for 3 songs
                        for (var i = 0; i < 3; i++) {
                            console.log("--------------------------------------------------------------------------------");
                            console.log("Artist: " + JSON.stringify(data.tracks.items[i].album.artists[0].name, null, 2));
                            console.log("Name: " + JSON.stringify(data.tracks.items[i].name, null, 2));
                            console.log("Preview URL: " + JSON.stringify(data.tracks.items[i].preview_url, null, 2));
                            console.log("Album: " + JSON.stringify(data.tracks.items[i].album.name, null, 2));
                            console.log("--------------------------------------------------------------------------------");
                        }
                    });
                     
                });

        }
        else if (inquirerResponse.actions === "movie-this") {
            console.log("movie-this")
        }
        else if (inquirerResponse.actions === "do-what-it-says") {
            console.log("do what?")
        }
    });














