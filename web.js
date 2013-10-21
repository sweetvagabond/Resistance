var express = require('express');
var app = express();
var visitorCount = 0;
app.use(express.logger());

app.use(express.static(__dirname + '/static'));
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
