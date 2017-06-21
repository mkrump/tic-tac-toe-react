var axios = require('axios');

function Endpoint(url, timeout) {
    this.httpRequest = axios.create({
        baseURL: url,
        timeout: timeout,
    });
}

var validateMoveEndpoint = new Endpoint('https://tic-tac-toe-clojure.herokuapp.com', 15000);

validateMoveEndpoint.validateMove = function (gameState, move) {
    return this.httpRequest({
        method: 'post',
        url: '/valid-move',
        data: {
            move: move,
            "game-state": {
                board: {"board-contents": gameState.board.boardContents, gridsize: gameState.board.gridSize},
                "current-player": gameState.currentPlayer,
                winner: gameState.winner,
                "is-tie": gameState.isTie,
            },
        }
    });
}.bind(validateMoveEndpoint);

var computerMoveEndpoint = new Endpoint('https://tic-tac-toe-clojure.herokuapp.com', 15000);

computerMoveEndpoint.computerMove = function (gameState) {
    return this.httpRequest({
        method: 'post',
        url: '/computer-move',
        data: {
            "game-state": {
                board: {"board-contents": gameState.board.boardContents, gridsize: gameState.board.gridSize},
                "current-player": gameState.currentPlayer,
                winner: gameState.winner,
                "is-tie": gameState.isTie,
            }
        }
    });
}.bind(computerMoveEndpoint);

var gameState = {
    board: {boardContents: [1, 0, 0, 0, 0, 0, 0, 0, 0], gridSize: 3},
    currentPlayer: -1,
    winner: 0,
    isTie: false,
};

validateMoveEndpoint.validateMove(gameState, 1)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (response) {
        console.log(response);
    });

computerMoveEndpoint.computerMove(gameState)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (response) {
        console.log(response);
    });

module.exports.validateMoveEndpoint = validateMoveEndpoint;
module.exports.computerMoveEndpoint = computerMoveEndpoint;

