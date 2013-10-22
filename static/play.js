function getParameterByName(name) {
    // From: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function gameId() {
    return getParameterByName('game');
}

function playerId() {
    return getParameterByName('player');
}

function checkMessages() {
    $.ajax({
        url: '/receive',
        type: 'POST',
        data: {
            game_id: gameId(),
            player_id: playerId()
        },
        dataType: 'json',
        success: function(messages) {
            if (messages.length > 0) {
                console.log(messages);
            }
        }
    });
};

$(function() {
    setInterval(checkMessages, 2 * 1000);
});
