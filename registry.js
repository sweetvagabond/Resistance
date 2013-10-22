var state = require('./state');
var games = {};

exports.getOrCreateGame = function(gameId) {
  // SHOULD: consider case where gameId === 'hasOwnProperty'.
  if (!games.hasOwnProperty(gameId)) {
    games[gameId] = new state.Game(gameId);
  }
  return games[gameId];
};

exports.getGame = function(gameId) {
  // MUST: Complain if name is not in our map.
  return games[gameId];
};

exports.endGame = function(gameId) {
  // MUST: Complain if name is not in our map.
  delete games[gameId];
};
