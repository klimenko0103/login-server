

var express = require('express')

var app = express()

app.use(require('./app/routes'))

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Server up and running in %d ', server.address().port)
})


