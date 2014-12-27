

//Declarations
var express = require('express');
var bodyParser = require('body-parser');

//Getting the app handle
var app = express();

//Getting the json Parser
var jsonParser = bodyParser.json();

// parse various different custom JSON types as JSON
//app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json())

//For cross-domain access
app.use( function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

var simpledb = require('simpledb');

var commandLineArgs = process.argv.slice(2); 

var sdb = new simpledb.SimpleDB(
        {keyid: commandLineArgs[0],
        secret: commandLineArgs[1]},
        simpledb.debuglogger
)

app.post('/helpus',  function(req, res) {
   console.log('email: ' + req.body.email);
   console.log('name: ' + req.body.name);
   console.log('telephone: ' + req.body.telephone);
   console.log('comment: ' + req.body.comment);


   res.send("hello");	

sdb.putItem('smalltalk', req.body.email, {comment: req.body.comment, name: req.body.name, telephone: req.body.telephone}, function(err, res, meta) {
        console.log('executed: ' + JSON.stringify(res))
});

});


app.listen(process.env.PORT || 8080);
