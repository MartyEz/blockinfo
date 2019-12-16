

//
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const WebSocket = require('ws');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'db';

// Create a new MongoClient
const client = new MongoClient(url);

const insertDocuments = function(db,data, callback) {
    // Get the documents collection
    const collection = db.collection('btcblock');
    // Insert some documents
    collection.insert([
        data], function(err, result) {
        assert.equal(err, null);
        console.log("Inserted into the collection");
        callback(result);
    });
};

let db=null;

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to mongo");
    db = client.db(dbName);

});

const wsc = new WebSocket("wss://ws.blockchain.info/inv");
const wss = new WebSocket.Server({port:3001});

wss.on('connection', (client,req) => {
   console.log("New client");
});

wsc.on('open',()=> {
    console.log('connected to api');
    wsc.send('{"op":"ping"}');
    wsc.send('{"op":"blocks_sub"}');
});

wsc.on('message',(msg) => {
    let json = JSON.parse(msg);
    insertDocuments(db,json, function(result) {
        console.log(result);
    });
    wss.clients.forEach((clientToSend) =>{
        if(clientToSend.readyState === WebSocket.OPEN)
            clientToSend.send(msg);
    })
});




