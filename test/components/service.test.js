var axios = require('axios');
var Service = require('../../src/service');

describe('validateMoveEndpoint', function () {

    beforeEach(function () {
        gameState = {
            board: {boardContents: [1, 0, 0, 0, 0, 0, 0, 0, 0], gridSize: 3},
            currentPlayer: -1,
            winner: 0,
            isTie: false,
        };
    });

    it('Is called with gameState and move', function () {
        var move = 1;
        spyOn(Service.validateMoveEndpoint, 'validateMove');
        Service.validateMoveEndpoint.validateMove(gameState, move);
        expect(Service.validateMoveEndpoint.httpRequest.defaults.baseURL).toEqual("https://tic-tac-toe-clojure.herokuapp.com");
        expect(Service.validateMoveEndpoint.validateMove).toHaveBeenCalledWith(gameState, move);
    });
});

describe('computerMoveEndpoint', function () {

    beforeEach(function () {
        gameState = {
            board: {boardContents: [1, 0, 0, 0, 0, 0, 0, 0, 0], gridSize: 3},
            currentPlayer: -1,
            winner: 0,
            isTie: false,
        };
    });

    it('Is called with gameState', function () {
        spyOn(Service.computerMoveEndpoint, 'computerMove');
        Service.computerMoveEndpoint.computerMove(gameState);
        expect(Service.computerMoveEndpoint.httpRequest.defaults.baseURL).toEqual("https://tic-tac-toe-clojure.herokuapp.com");
        expect(Service.computerMoveEndpoint.computerMove).toHaveBeenCalledWith(gameState);
    });
});


