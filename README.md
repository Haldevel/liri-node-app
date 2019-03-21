### liri-node-app
### by Halina Z

#### Description

_________________________________________________________________

The CLI program allows user to search Spotify for songs, Bands in Town for concerts, and OMDB for movies. It asks the user using inquirer package to select between search options ("concert-this", "spotify-this-song", "movie-this), or the test option which reads the song's name to search from a text file. 
_________________________________________________________________

The program will ask to choose between the following options:
![Prompt](images/ScreenShot_1.png)

If a user picks **concert-this** option, the program asks to enter a performer/band name, otherwise using *Pink Martini* as a default band. 

![Selecting a performer](images/ScreenShot_2.png)

When a user enters a performer's name, the program searches Bands in Town for concerts of the performer, and lists top 10 concerts to the screen:

![Bands in Town search results](images/ScreenShot_4.png)



If the user selects  **spotify-this-song** option, the program will prompt to enter a song's title,and will Spotify API to get the data of the top three tracks with this title: 

![Spotify search results](images/ScreenShot_6.png)

If the user enters no title, three top *"The Sign" Ace of Base* tracks will be shown:

![Spotify default search results](images/ScreenShot_5.png)



If the user picks  **movie-this** option, the program will ask for the movie title to search and will use *"Mr. Nobody"* if the user enetyer nothing:

![OMDB Movie API default search results](images/ScreenShot_7.png)

If the user eneter the movie's name, the program will fetch the information about the movie and print in to console:

![OMDB Movie API default search results](images/ScreenShot_8.png)

If the user picks the last option <do-what-it-says>, the program will read the song's name from "random.txt" file, and use spotify to search the song's data and display the top 3 records:  

![Do-what-it-says default song's results](images/ScreenShot_9.png)


_________________________________________________________________

Technologies used:
  * node.js
  * APIs: 
    * Node-Spotify-API
    * OMDB API
    * Bands In Town API
  * Packages: 
    * Axios
    * Moment
    * DotEnv

_________________________________________________________________