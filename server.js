// imports
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3');


// connect to a database:
// var db = new sqlite3.Database('myDatabase.db');
var db = new sqlite3.Database(':memory:');

db.serialize(function(){
    // create table
    db.run('CREATE TABLE Contacts (first_name TEXT, last_name TEXT, age INTEGER)');
    
    // Insert values
    db.run('INSERT INTO Contacts VALUES ("John", "Doe", 25)')
    db.run('INSERT INTO Contacts VALUES ("Jane", "Doe", 19)')
    db.run('INSERT INTO Contacts VALUES ("Sue", "Smith", 42)')   

    // queries
    db.all('SELECT * FROM Contacts', processRows);
    db.each('SELECT * FROM Contacts', processRow);
    db.each('SELECT * FROM Contacts WHERE last_name = "Doe"', processRow);
    
    var firstName = "John";
    db.get('SELECT * FROM Contacts WHERE first_name = ?', [firstName], function(err, row){
        console.log("Get John's Age:");
        if(err) console.log("ERROR: " + err.message);
        else{
            console.log(row.age);
        }
    });
});

// DB.ALL()
function processRows(err, rows){
    if(err){ console.log("Error: " + err.message);}

    else{
        for(var i=0; i<rows.length; i++){
            console.log(rows[i].first_name);
        }
        console.log("--> All ended.");
    }
}

// db.each()
function processRow(err, row){
    if(err){
        console.log("Error: " + err.message);
    }
    else{
        console.log(row.first_name);
        console.log(" >> each ended");
    }
}

db.close();


// //mounts BodyParser as middleware - every request passes through it
// app.use(bodyParser.urlencoded({ extended: true })); 


// var quotes = [
//     {
//         id: 1,
//         quote: "The best is yet to come",
//         author: "Unknown",
//         year: 2000
//     },
//     {
//         id: 2,
//         quote: "This is a quote",
//         author: "First Last",
//         year: 1930
//     },
//     {
//         id: 3,
//         quote: "This is another quote",
//         author: "First2 Last2",
//         year: 1910
//     }
// ];


// ROUTES
// app.get('/', function(req, res) {
//     res.send("Get request received at '/' ");
// });

// app.get('/quotes', function(req, res){
//     if(req.query.year){
//         res.send("Return a list of quotes from the year: " + req.query.year);
//     }
//     else{
//         res.json(quotes);
//     }
// });

//  app.get('/quotes/:id', function(req, res){
//     console.log("return quote with the ID: " + req.params.id);
//     res.send("Return quote with the ID: " + req.params.id);
// });

// app.post('/quotes', function(req, res){
//     console.log("Insert a new quote: " + req.body.quote);
//     res.json(req.body);
// });

// app.listen(3000, function(){
//     console.log('Listening on Port 3000');
// });