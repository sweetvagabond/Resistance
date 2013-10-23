var express = require('express');
var querystring = require('querystring');
var state = require('./state');
var app = express();

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/static'));

app.post('/play', function(req, res) {
    var gameId = req.body.game_id;
    var playerId = req.body.player_id;
    var game = state.getOrCreateGame(gameId);
    var player = game.getOrCreatePlayer(playerId);
    var qstr = querystring.stringify({game: gameId, player: playerId});
    res.redirect(301, '/play.html?' + qstr);
});

app.post('/receive', function(req, res) {
    var gameId = req.body.game_id;
    var playerId = req.body.player_id;
    var game = state.getGame(gameId);
    var player = game.players.get(playerId);
    var messages = player.receive();
    res.send(JSON.stringify(messages));
});

app.post('/send', function(req, res) {
    var gameId = req.body.game_id;
    var playerId = req.body.player_id;
    var game = state.getGame(gameId);
    var message = JSON.parse(req.body.message || 'null');
    var raw = game.phase.receive(message);
    var ans = (raw === void 0) ? null : raw;
    res.send(JSON.stringify(ans));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
