
var express = require('express');
var cors = require('cors')
var app = express();

app.use(cors())


app.use(require('./app/routes'));
app.use(express.static(__dirname + '/build'));

var server = app.listen(process.env.PORT || 8000, function() {
    console.log('Server up and running in %d ', server.address().port)
});


