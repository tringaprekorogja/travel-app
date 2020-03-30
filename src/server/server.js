// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const request = require('request');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('/dist'));

// Setup Server
const port = 8081;

const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.post('/trip/weather', (req, res) => {
    console.log(req.body)
    request(
        { url: req.body.url },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }
            res.json(JSON.parse(body));
            console.log('hej')
        }
    )
});

app.get('/allEntries', sendData)

function sendData(request, response) {
    response.send(projectData);
};


app.post('/addNewEntry', postData);


function postData(request, respond) {

    projectData = {

        Country: request.body.Country,
        Latitude: request.body.Latitude,
        Longitude: request.body.Longitude,
    }

    console.log('data is ' + projectData)
    respond.send(projectData)
}