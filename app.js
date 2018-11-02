// Jeffrey Phelps 2018


// Initializing Express.js NPM package
const express = require('express');
const app = express();

// Initializing Request.js NPM package
const request = require('request');



// ROUTS

// Creating the Homepage Route
app.get("/", function(req, res){ // Using express to create HTTP route, with required callback
    res.render("index.ejs"); // Rendering the index file from the views folder
});


// Creating the Results Route
app.get("/results", function(req, res){ // Using express to create HTTP route, with required callback

    // Creating an API Key variable. API key, required for accessing OMDB database, given by Colt Steele bootcamp
    const apiKey = "thewdb";
    // Grabbing the formSearch data from index.ejs "formSearch" variable
    let searchQuery = req.query.formSearch;
    // Creating a search url variable out of the search data and API Key
    let searchURL = "http://www.omdbapi.com/?s=" + searchQuery + "&apikey=" + apiKey;

    // Using Request.js inside of Express.js to make the api call to the OMDB database
    request(searchURL, function(error, response, body){ // Making API request, with the above search url variable and required callback
        if(!error && response.statusCode == 200){ // If there is no error and the server response status code is 200, or "OK"
            let responseObject = JSON.parse(body); // Parsing the response, a string, into an object, and creating a variable out of it
            res.render("results.ejs", {response: responseObject}); // Rendering the desired file from the views folder and the response object and calling the object "response"
        }
    });
    
});



// APP SERVER

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Movie App server up and running!");
});


