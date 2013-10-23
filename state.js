var util = require('./util');

var games = new util.Dictionary();

exports.getOrCreateGame = function(gameId) {
  if (!games.containsKey(gameId)) {
    games.set(gameId, new Game(gameId));
  }
  return games.get(gameId);
};

exports.getGame = function(gameId) {
  return games.get(gameId);
};

exports.endGame = function(gameId) {
  games.removeKey(gameId);
};


function Game(gameId) {
    this.gameId = gameId;
    // Map of playerId to Player object.
    this.players = new util.Dictionary();
}

function Player(playerId) {
    this.playerId = playerId;
    // List of pending messages.
    this.mailbox = [];
};

Player.prototype.receive = function() {
    var ans = this.mailbox;
    this.mailbox = [];
    return ans;
};

Player.prototype.send = function(msg) {
    this.mailbox.push(msg);
};

Game.prototype.getOrCreatePlayer = function(playerId) {
    if (!this.players.containsKey(playerId)) {
        // Create a new player.
        var player = new Player(playerId);
        // Add the player to our map.
        this.players.set(playerId, player);
        // Don't broadcast the new player until after we've updated the map.
        this.broadcastNewPlayer();
    }
    return this.players.get(playerId);
};


Game.prototype.broadcast = function(message) {
    this.players.eachValue(function(player) {
        player.send(message);
    });
};

Game.prototype.broadcastNewPlayer = function() {
    this.broadcast({
        subject: 'NewPlayer',
        body: this.players.keys()
    });
};
