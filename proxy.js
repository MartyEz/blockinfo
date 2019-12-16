// This is a http proxy which is used to allow Cross-origin resource sharing (CORS).
// Modules imports
var express = require('express');
var app = express();
var proxy = require('express-http-proxy');
var morgan = require('morgan');

// Use morgan to see requests
app.use(morgan('combined'));


// Allow cors by modifying response header
app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Define differents proxy routes
app.use('/proxy', proxy('https://blockchain.info/'));
app.use('/proxyLocal', proxy('http://127.0.0.1:3002/'));

// Listen port
app.listen(8081);