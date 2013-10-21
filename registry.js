var games = {};

function Game(gameId, playerCount) {
  this.gameId = gameId;
  this.playerCount = playerCount;
}


exports.startGame = function(gameId, playerCount) {
  if (games.hasOwnProperty(gameId)) {
    // MUST: Report error.
    return;
  }
  var game = new Game(gameId, playerCount);
  games[gameId] = game;
};

exports.listGames = function() {
  var ans = [];
  for (var gameId in games) {
    if (games.hasOwnProperty(gameId)) {
      var game = games[gameId];
      ans.push(game);
    }
  }
  // MUST: Sort by game id.
  return ans;
};

exports.endGame = function(gameId) {
  // MUST: Complain if gameId is not in our map.
  delete games[gameId];
};
