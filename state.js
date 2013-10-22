function Game(gameId) {
    this.gameId = gameId;
    // Map of playerId to Player object.
    this.players = {};
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
    // SHOULD: consider case where playerId === 'hasOwnProperty'.
    if (!this.players.hasOwnProperty(playerId)) {
        // Create a new player.
        var player = new Player(playerId);
        // Add the player to our map.
        this.players[playerId] = player;
        // Don't broadcast the new player until after we've updated the map.
        this.broadcastNewPlayer();
    }
    return this.players[playerId];
};

Game.prototype.getPlayer = function(playerId) {
    // SHOULD: handle case when player is not defined.
    return this.players[playerId];
};


Game.prototype.getPlayerIds = function() {
    var playerIds = [];
    for (var playerId in this.players) {
        if (this.players.hasOwnProperty(playerId)) {
            playerIds.push(playerId);
        }
    }
    return playerIds;
};


Game.prototype.getPlayers = function() {
    var playerIds = this.getPlayerIds();
    var players = [];
    for (var i = 0; i < playerIds.length; i += 1) {
        var playerId = playerIds[i];
        var player = this.players[playerId];
        players.push(player);
    }
    return players;
};


Game.prototype.broadcast = function(message) {
    var players = this.getPlayers();
    for (var i = 0; i < players.length; i += 1) {
        var player = players[i];
        player.send(message);
    }
};

Game.prototype.broadcastNewPlayer = function() {
    var playerIds = this.getPlayerIds();
    var message = {
        subject: 'NewPlayer',
        body: playerIds
    };
    this.broadcast(message);
};

exports.Game = Game;
