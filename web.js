var express = require('express');
var registry = require('./registry');
var app = express();
var visitorCount = 0;
app.use(express.logger());

app.use(express.static(__dirname + '/static'));

app.get('/start_game', function(req, res) {
  var name = req.query.name;
  registry.startGame(name);
  // Redirect to the "join" screen.
  res.redirect(301, '/join/' + name);
});

app.get('/list_current_games', function(req, res) {
  var ans = registry.listGames();
  res.send(JSON.stringify(ans));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
