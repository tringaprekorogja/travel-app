
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

module.exports = app.listen(port, listening);
function listening() {
    // console.log(`running on localhost: ${port}`);
};

// Creates a proxy server
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


app.post('/trip/weather', (req, res) => {
    request(
        { url: req.body.url },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
});
// C
app.post('/trip/weather/image', (req, res) => {
    console.log(req.body)
    request(
        { url: req.body.url },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
});









