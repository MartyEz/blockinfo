// This server handle connections beetween front-end, external api and local mongodb

// Imports
const express = require('express');
let app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const WebSocket = require('ws');



// MONGO

// Declare const used to create mongodb instance
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'db';
const client = new MongoClient(url);
let db = null;

// This function insert new document to mongodb
const addNewBlock = function (db, data, callback) {
    const collection = db.collection('btcblock');
    collection.insert([
        data], function (err, result) {
        assert.equal(err, null);
        callback(result);
    });
};

// This function get last 10 blocks from mongodb
const getLastBlocks = function (db, callback) {
    const collection = db.collection('btcblock');
    collection.find().sort({'x.height': -1}).limit(20).toArray(function (err, docs) {
        assert.equal(err, null);

        callback(docs)
    });
};

// Create mongo instance and init db object
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to mongo");
    db = client.db(dbName);
});



// WEB-SOCKET

// create a websocket client to ask external blockchain.info api
const wsc = new WebSocket("wss://ws.blockchain.info/inv");

// create a websocket server to feed clients
const wss = new WebSocket.Server({port: 3001});

// connection event listener on websocket server
wss.on('connection', (client, req) => {
    console.log("New client");
});

// Registration on the blockchain.info's websocket server. Ask to alerted when new block is created
wsc.on('open', () => {
    console.log('connected to api');
    wsc.send('{"op":"blocks_sub"}');
});

// Liwtener on new message comming from blockchain.info' wb
wsc.on('message', (msg) => {
    // parse infos received into json format
    let json = JSON.parse(msg);
    // insert parsed info to mongodb
    addNewBlock(db, json, function (result) {
    });
    // Send new info to front-end clients connected to the backend's websocket server
    wss.clients.forEach((clientToSend) => {
        if (clientToSend.readyState === WebSocket.OPEN)
            clientToSend.send(msg);
    })
});



//APP

app.use(morgan('combined'));

// POST Api.
app.post('/getLastBlocks', function (req, res) {
    getLastBlocks(db, function (docs) {
        res.send(docs);
        res.end()
    })
});

// Listen port
app.listen(3002);




