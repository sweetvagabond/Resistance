function Game(gameId) {
    this.gameId = gameId;
    this.players = {};
}

function Player(playerId) {
    this.playerId = playerId;
};

Game.prototype.getOrCreatePlayer = function(playerId) {
    // SHOULD: consider case where playerId === 'hasOwnProperty'.
    if (!this.players.hasOwnProperty(playerId)) {
        this.players[playerId] = new Player(playerId);
    }
    return this.players[playerId];
};

exports.Game = Game;
