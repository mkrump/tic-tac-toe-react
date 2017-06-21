var axios = require('axios');

var TicTacToeEndpoint = axios.create({
    baseURL: 'https://tic-tac-toe-clojure.herokuapp.com',
    timeout: 15000
});

var translateGameStateToAPIFormat = function (gameState) {
    return {
        board: {"board-contents": gameState.board.boardContents, gridsize: gameState.board.gridSize},
        "current-player": gameState.currentPlayer,
        winner: gameState.winner,
        "is-tie": gameState.isTie,
        "game-over": gameState.gameOver
    }
};

var translateGameStateFromAPIFormat = function (responseData) {
    return {
        board: {
            boardContents: responseData.board['board-contents'],
            gridSize: responseData.board.gridsize
        },
        currentPlayer: responseData['current-player'],
        winner: responseData.winner,
        isTie: responseData['is-tie'],
        gameOver: responseData['game-over']

    };
};

TicTacToeEndpoint.validateMove = function (gameState, move) {
    return this.httpRequest({
        method: 'post',
        url: '/valid-move',
        data: {
            move: move,
            "game-state": translateGameStateToAPIFormat(gameState),
        }
    });
}.bind(TicTacToeEndpoint);

TicTacToeEndpoint.computerMove = function (gameState) {
    return this.httpRequest({
        method: 'post',
        url: '/computer-move',
        data: {
            "game-state": translateGameStateToAPIFormat(gameState),
        }
    });
}.bind(TicTacToeEndpoint);

module.exports.TicTacToeEndpoint = TicTacToeEndpoint;
module.exports.translateGameStateToAPIFormat = translateGameStateToAPIFormat;
module.exports.translateGameStateFromAPIFormat = translateGameStateFromAPIFormat;

