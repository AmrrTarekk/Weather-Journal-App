// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3110;

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server = app.listen(port,listeningFn);

// callback to debug 
function listeningFn(){
    console.log('Server is running');
    console.log(`Running on port ${port}`);
}

// GET method route 
app.get('/getInformation', (req, res)=> {
    res.send(projectData);
  });


// POST method route 
app.post('/saveInformation', (req, res)=> {
    // projectData.date = req.body.date;   
    // projectData.temp = req.body.temp;
    // projectData.content = req.body.content;

    // method 2 
    // projectData = req.body;

    // //method 3 
    projectData = {...req.body};

    // res.end();
    res.send(projectData);

  });
  