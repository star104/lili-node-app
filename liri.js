require("dotenv").config();
var keys = require("./keys.js");
//ini file system
var fs = require("fs");

var Spotify = require('node-spotify-api');
//npm package
var axios = require("axios");
var moment = require("moment");
//var request = require("request");
var bandsintown = require('bandsintown')("codingbootcamp");
var spotify = new Spotify(keys.spotify);

//defult
var defSong = "The Sign";
var defMovie = "Mr. Nobody";

//commom line argement
var nodeArg = process.argv;
var action = nodeArg[2];

//empty array to load data
var Name ="";

 if (nodeArg.length>=4)
 {
   for (var i = 3; i < nodeArg.length; i++) {
     Name = Name + nodeArg[i] + " ";
   }
 }
 
switch (action) {
  case "concert-this":
    if (nodeArg.length==3)
    {console.log("Please specify Concert name!");}
    else{findConcert(Name);}
    break;
  case "spotify-this-song":
  if (nodeArg.length==3)
  {Name = Name+defSong;}
    findSong(Name);
    break;

  case "movie-this":
  if (nodeArg.length==3)
  {Name = Name+defMovie;}
    findMovie(Name);
    break;
  case "do-what-it-says":
    fsCommand();
    break;
}

function findConcert(artist) {
  console.log(artist);
  bandsintown
  .getArtistEventList(artist,"all")
  .then(function(events) {
   // console.log(events);
    console.log(events[0].venue.name);
    console.log(events[0].venue.city);
    console.log(moment(events[0].datetime).format("MM/DD/YYYY"));
  
    // return array of events
  });
  
};

function findSong(songTitle) {
  console.log(spotify);
 }

function findMovie(movieTitle) { 
  var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
  axios.get(movieQueryUrl).then(
  function(response) {
    
    console.log("\nMovie title: " + response.data.Title);
    console.log("\nYear: " + response.data.Year);
    console.log("\nIMDB Rating: "+ response.data.imdbRating);
    console.log("\nRotten Tomatoes Rating: "+response.data.Ratings[1].Value);
    console.log("\nCountry: "+response.data.Country);
    console.log("\nLanguage: "+response.data.Language); 
    //console.log(response.data)
    ;}
)};

function fsCommand() 
{
  fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);
  switch (dataArr[0])
  {
  case "movie-this":
  findMovie(dataArr[1]);
  break;
  case "concert-this":
  findConcert(dataArr[1]);
  break;
  }
});  

}


