var express = require('express');
var app = express();
var visitorCount = 0;
app.use(express.logger());

app.get('/', function(request, response) {
    visitorCount += 1;
    response.send('Hello! You are visitor #' + visitorCount + '.');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
