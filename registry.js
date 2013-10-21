var state = require('./state');
var games = {};


exports.startGame = function(name) {
  if (games.hasOwnProperty(name)) {
    // MUST: Report error.
    return;
  }
  var game = new state.Game(name);
  games[name] = game;
};

exports.listGames = function() {
  var ans = [];
  for (var name in games) {
    if (games.hasOwnProperty(name)) {
      var game = games[name];
      ans.push(game.name);
    }
  }
  // MUST: Sort by game id.
  return ans;
};

exports.endGame = function(name) {
  // MUST: Complain if name is not in our map.
  delete games[name];
};
