var express = require('express');
var registry = require('./registry');
var app = express();
var visitorCount = 0;
app.use(express.logger());

app.use(express.bodyParser());
app.use(express.static(__dirname + '/static'));

app.post('/start_game', function(req, res) {
  var gameId = req.body.game_id;
  var playerCount = req.body.player_count;
  registry.startGame(gameId, playerCount);
  // MUST: Send redirect.
  res.send('Ok');
});

app.get('/list_current_games', function(req, res) {
  var ans = registry.listGames();
  res.send(JSON.stringify(ans));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
