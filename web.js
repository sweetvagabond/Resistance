var express = require('express');
var registry = require('./registry');
var app = express();

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/static'));

app.post('/play', function(req, res) {
    var gameId = req.body.game_id;
    var playerId = req.body.player_id;
    var game = registry.getOrCreateGame(gameId);
    var player = game.getOrCreatePlayer(playerId);
    // MUST: URL-encode both IDs.
    res.redirect(301, '/play.html?game=' + gameId + '&player=' + playerId);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
