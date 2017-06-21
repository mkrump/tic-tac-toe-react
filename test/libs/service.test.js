var axios = require('axios');
var service = require('../../src/service');

describe('validateMoveEndpoint', function () {
    var gameState;

    beforeEach(function () {
        gameState = {
            board: {boardContents: [0, 0, 0, 0, 0, 0, 0, 0, 0], gridSize: 3},
            currentPlayer: 1,
            winner: 0,
            isTie: false,
            gameOver: false,
        }
    });

    it('Is called with gameState and move', function () {
        var move = 1;
        spyOn(service.TicTacToeEndpoint, 'validateMove');
        service.TicTacToeEndpoint.validateMove(gameState, move);
        expect(service.TicTacToeEndpoint.defaults.baseURL).toEqual("https://tic-tac-toe-clojure.herokuapp.com");
        expect(service.TicTacToeEndpoint.validateMove).toHaveBeenCalledWith(gameState, move);
    });
});

describe('computerMoveEndpoint', function () {
    var gameState;

    beforeEach(function () {
        gameState = {
            board: {boardContents: [0, 0, 0, 0, 0, 0, 0, 0, 0], gridSize: 3},
            currentPlayer: 1,
            winner: 0,
            isTie: false,
            gameOver: false,
        }
    });

    it('Is called with gameState', function () {
        spyOn(service.TicTacToeEndpoint, 'computerMove');
        service.TicTacToeEndpoint.computerMove(gameState);
        expect(service.TicTacToeEndpoint.defaults.baseURL).toEqual("https://tic-tac-toe-clojure.herokuapp.com");
        expect(service.TicTacToeEndpoint.computerMove).toHaveBeenCalledWith(gameState);
    });
});

describe('translateGameState', function () {
    var gameState;

    beforeEach(function () {
        gameState = {
            board: {boardContents: [0, 0, 0, 0, 0, 0, 0, 0, 0], gridSize: 3},
            currentPlayer: 1,
            winner: 0,
            isTie: false,
            gameOver: false,
        }
    });

    it('Is translates gameState to API endpoint format', function () {

        var apiFormat = {
            board: {"board-contents": [0, 0, 0, 0, 0, 0, 0, 0, 0], "gridsize": 3},
            "current-player": 1,
            winner: 0,
            "is-tie": false,
            "game-over": false,
        };
        expect(service.translateGameStateToAPIFormat(gameState)).toEqual(apiFormat);
    });

    it('Is translates API game-state response to js gameState object', function () {

        var apiFormat = {
            board: {"board-contents": [0, 0, 0, 0, 0, 0, 0, 0, 0], "gridsize": 3},
            "current-player": 1,
            winner: 0,
            "is-tie": false,
            "game-over": false,
        };

        expect(service.translateGameStateFromAPIFormat(apiFormat)).toEqual(gameState);

    });

});


