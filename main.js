require('./config.js');

var express             = require('express'),
    bodyParser          = require('body-parser');
    mysql               = require('./dbcon.js');
    axios               = require('axios');

var app                 = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.set('view engine', "ejs");


var gymAPI = require('./routes/API/gyms');
app.use('/api/gyms', gymAPI);
var equipmentAPI = require('./routes/API/equipment');
app.use('/api/equipment', equipmentAPI);
var gymWebApp = require('./routes/gyms');
app.use('/', gymWebApp);

app.get('/', function(req, res){
  res.send("Hello from the root route!");
})

app.listen(app.get('port'), function(){
  console.log("StrongDB started on http://localhost:" + app.get('port'));
})
