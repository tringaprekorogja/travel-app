// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

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

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
// Setup Server
const port = 3000;

const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};

app.get('/allEntries', sendData)

function sendData(request, response) {
    response.send(projectData);
};


app.post('/addNewEntry', postData);


function postData(request, respond) {

    projectData = {

        temperature: request.body.temperature,
        date: request.body.date,
        feelings: request.body.feelings
    }

    console.log('data is ' + projectData)
    respond.send(projectData)
}