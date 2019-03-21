//import all required packages/modules

require("dotenv").config();

var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var axios = require("axios");
var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");

var testPerformer;

// Create a Prompt with a list of options
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
        if (inquirerResponse.actions === "concert-this") { //if the concert-this option was picked ask for performer
            inquirer.prompt([
                {
                    type: "input",
                    message: "Who is the performer/band you want to search for concerts of?",
                    name: "performer",
                    default: "Pink Martini"   //use Pink martini as default

                },
            ])
                .then(function (inquirerResponse) {
                    //when user inputs data call the giveConcerts function to call bands in town api via axios
                    var performer = inquirerResponse.performer;
                    console.log("Searching for " + performer + " concerts");
                    giveConcerts(performer);

                });


        }
        else if (inquirerResponse.actions === "spotify-this-song") { //if spotify-this-son option is picked

            //get a song name from a user
            inquirer.prompt([
                {
                    type: "input",
                    message: "What song do you want to spotify?",
                    name: "song",
                    default: "The Sign Ace of Base" //use the song as default

                },
            ])
                .then(function (inquirerResponse) {

                    console.log("Spotifying Song " + inquirerResponse.song);
                    runSpotify(inquirerResponse.song);

                });

        }
        else if (inquirerResponse.actions === "movie-this") { //if the movie option was picked
            //console.log("movie-this");

            //Retrive the movie name via prompt here
            inquirer.prompt([
                {
                    type: "input",
                    message: "What movie do you want to check?",
                    name: "movie",
                    default: "Mr. Nobody"

                },
            ])
                .then(function (inquirerResponse) {
                    var movieTitle = inquirerResponse.movie;
                    console.log("Getting info about " + movieTitle);
                    //call the function which gets movie info via axios
                    checkOMDB(movieTitle);
                });

        }
        else if (inquirerResponse.actions === "do-what-it-says") {

            //we will read the song's title from random.txt
            fs.readFile("random.txt", "utf8", function (error, data) {

                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }

                // Split the data first by ';' and then by ',' to test the app
                var dataArr = data.split(";");
                for (var i = 0; i < dataArr.length; i++) {

                    var line = dataArr[i].split(",")
                    if(line[0].trim() === "spotify-this-song") {
                        runSpotify(line[1]);                       
                    }                   
                    else if(line[0].trim() === "concert-this") {
                        giveConcerts(testPerformer);
                    }
                    else if(line[0].trim() === "movie-this") {
                        checkOMDB(line[1]);
                    } 
                }
            });
        }
    });


//function to get data abou a song based on its title using node-Spotif-api
function runSpotify(songName) {
    var spotify = new Spotify(keys.spotify);
    //we will limit the output to three songs
    spotify.search({ type: 'track', query: songName, limit: 3 }, function (err, data) {
        if (err) {
            return console.log('Error occurred when using Spotify: ' + err);
        }

        //retrieve data for 3 songs
        for (var i = 0; i < 3; i++) {
            console.log("--------------------------------------------------------------------------------");
            console.log("Song # " + (i + 1));
            console.log("--------------------------------------------------------------------------------");
            console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
            console.log("Name: " + data.tracks.items[i].name);
            console.log("Preview URL: " + data.tracks.items[i].preview_url);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("--------------------------------------------------------------------------------");
        }
    });
}

//function to get movie data using OMDB api and axios
function checkOMDB(title) {
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy")
        .then(
            function (response) {
                console.log("--------------------------------------------------------------------------------");
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Released);
                console.log("Country: " + response.data.Country);
                console.log("The movie's IMDB rating is: " + response.data.imdbRating);
                console.log("The movie's Rotten Tomatoes rating is: " + response.data.Ratings[1].Value);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("--------------------------------------------------------------------------------");

            }
        )
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
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


}

//function to look for concerts using bandsintown api and axios
function giveConcerts(performer) {
    console.log("inside "+ performer);
    axios.get("https://rest.bandsintown.com/artists/" + performer + "/events?app_id=codingbootcamp")
        .then(
            function (response) {
                for (var i = 0; i < 10; i++) {
                    console.log("10 " + JSON.stringify(response.data, null, 2));
                    console.log("--------------------------------------------------------------------------------");
                    //console.log("Performer: " + response.data[i].lineup[0]);
                    console.log('20')
                    console.log("Venue Name: " + response.data[i].venue.name);
                    console.log("Venue Location: " + response.data[i].venue.city + " " + response.data[i].venue.region + " " + response.data[i].venue.country);
                    console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                    console.log("--------------------------------------------------------------------------------");
                }
            }
        )
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
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

}








