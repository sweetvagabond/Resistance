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
    this.phase = new AcceptingNewPlayers(this);
}

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

Game.prototype.enterPhase = function(Phase) {
    this.phase = new Phase(this);
    this.broadcast(this.phase.currentState());
    this.phase.run();
};

Game.prototype.getOrCreatePlayer = function(playerId) {
    if (!this.players.containsKey(playerId)) {
        // Create a new player.
        var player = new Player(playerId);
        // Add the player to our map.
        this.players.set(playerId, player);
        // Send the new player the initial state.
        player.send({
            subject: 'CurrentState',
            body: this.phase.currentState()
        });
        // Don't broadcast the new player until after we've updated the map.
        this.broadcastNewPlayer();
    }
    return this.players.get(playerId);
};

Game.prototype.numPlayers = function() {
    return this.players.size();
};

Game.prototype.numSpies = function() {
    return Math.ceil(this.numPlayers() / 3);
};

Game.prototype.numResistance = function() {
    return this.numPlayers() - this.numSpies();
};

Game.prototype.spies = function() {
    return util.where(this.players.values(), function(player) {
        return player.role === 'spy';
    });
};

Game.prototype.spyIds = function() {
    util.map(this.spies(), function(spy) {
        return spy.playerId;
    });
};


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



function AcceptingNewPlayers(game) {
    this.game = game;
    this.readyPlayers = new util.Set();
}

AcceptingNewPlayers.prototype.currentState = function() {
    return {
        phase: 'AcceptingNewPlayers',
        ready: this.readyPlayers.values(),
        players: this.game.players.keys()
    };
};

AcceptingNewPlayers.prototype.receive = function(message) {
    if (message.subject === 'PlayerReady') {
        this.readyPlayers.add(message.body);
        var numReady = this.readyPlayers.size();
        var numPlayers = this.game.numPlayers();
        if ((numPlayers >= 5) && (numPlayers === numReady)) {
            this.game.enterPhase(AssigningRoles);
        }
    }
};


function AssigningRoles(game) {
    this.game = game;
};

AssigningRoles.prototype.currentState = function() {
    return {
        phase: 'AssigningRoles',
        numSpies: this.game.numSpies(),
        numResistance: this.game.numResistance()
    };
};

AssigningRoles.prototype.receive = function(message) {};

AssigningRoles.prototype.run = function() {
    var numSpies = this.game.numSpies();
    var players = this.game.players.values();
    exports.shuffle(players);

    for (var i = 0; i < players.length; i += 1) {
        var player = players[i];
        player.role = (i < numSpies) ? 'spy' : 'resistance';
        player.send({
            subject: 'RoleAssignment',
            body: player.role
        });
    }

    var message = {
        subject: 'SpyIdentities',
        body: this.game.spyIds()
    };
    util.each(this.game.spies(), function(spy) {
        spy.send(message);
    });
    this.game.enterPhase(BeginRound);
};


function BeginRound(game) {
    this.game = game;
};

BeginRound.prototype.currentState = function() {
    return {
        phase: 'BeginRound'
    };
};

BeginRound.prototype.run = function() {

};
