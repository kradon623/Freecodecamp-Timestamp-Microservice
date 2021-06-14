// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
/*app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});*/

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// example: {"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
// bad example:                   "utc":"Fri Dec 25 2015 00:00:00 GMT+0000 (Coordinated Universal Time)"}
// example id: 2015-12-25
app.get('/api', (req, res) => {
  let d = new Date()
  let u = d.getTime()
  res.json({'unix': u, 'utc': d})
});

app.get('/api/:id', function (req, res) {
  const {id} = req.params;
  if (/^\d+$/.test(id)){
    var x = parseInt(id);
    console.log('con numeros '+x);
  } else {
    var x = Date.parse(id);
    console.log('sin numeros '+x);
  }
  if (isNaN(x)){
    res.json({'error': 'Invalid Date'});
  } /*else if (id.length > 10){
    let idParse = parseInt(id);
    let date = new Date(idParse);
    let idInt = date.getTime();
    date = date.toString();
    let diaStr = date.slice(0,3);
    let mes = date.slice(4,7);
    let diaInt = date.slice(8,10);
    let resto = date.slice(11,28);
    let dateStr = diaStr+', '+diaInt+' '+mes+' '+resto;
    let j = {'unix': idInt, 'utc': dateStr};
    let test = new Date(j.utc);
    res.json(j);
  } else {
    let date = new Date(id);
    let idInt = date.getTime();
    date = date.toString();
    let diaStr = date.slice(0,3);
    let mes = date.slice(4,7);
    let diaInt = date.slice(8,10);
    let resto = date.slice(11,28);
    let dateStr = diaStr+', '+diaInt+' '+mes+' '+resto;
    let j = {'unix': idInt, 'utc': dateStr};
    res.json(j);
  };*/
  else {
    let date = new Date(x);
    let idInt = date.getTime();
    date = date.toString();
    let diaStr = date.slice(0,3);
    let mes = date.slice(4,7);
    let diaInt = date.slice(8,10);
    let resto = date.slice(11,28);
    let dateStr = diaStr+', '+diaInt+' '+mes+' '+resto;
    let j = {'unix': idInt, 'utc': dateStr};
    res.json(j);
  };
});
