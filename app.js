var express             = require('express'),
    bodyParser          = require('body-parser');
    mysql               = require('./dbcon.js');

var app                 = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static('public'));
app.use('/', express.static('public'));
app.set('port', process.argv[2]);
app.set('mysql', mysql);

var gymAPI = require('./routes/API/gyms');
app.use('/api/gyms', gymAPI);

app.get('/', function(req, res){
  res.send("Hello from the root route!");
})

app.listen(app.get('port'), function(){
  console.log("StrongDB started on http://localhost:" + app.get('port'));
})
