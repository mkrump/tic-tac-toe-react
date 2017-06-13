var React = require('react');
var ReactTestUtils = require('react-dom/test-utils');

var Board = require('../../src/components/Board.react');
var Game = require('../../src/components/Game.react');
var Reset = require('../../src/components/Reset.react');

describe('setInitialState', function () {
    it('initializes an initial game state object', function () {
        return {
            board: {boardContents: [0, 0, 0, 0, 0, 0, 0, 0, 0], gridSize: 3},
            currentPlayer: 1,
            winner: 0,
            isTie: false,
        };
        var initStateObj = Game.setInitialState();
        expect(initStateObj).toEqual(expected);
    });
});

describe('setDefaultProps', function () {
    it('initializes an initial props object', function () {
        var expected = {
            players : {"COMPUTER": -1, "HUMAN": 1},
            playerMarkers : {"-1": "O", "1": "X"},
            playerClickHandlers: {"-1": Game.nullClickHandler, "1": Game.humanClickHandler},
            makeComputerMove: Game.computerMoveHandler,
        };
        var initPropObj = Game.setDefaultProps();
        console.log(initPropObj);
        expect(initPropObj).toEqual(expected);
    });
});

describe('UIMarkers', function () {
    it('translates board squares to UI markers', function () {
        var playerMarkers = {"-1": "O", 1: "X"};
        var uiMarkers = Game.UIMarkers([0, 1, -1], playerMarkers);
        var expected = ["", "X", "O"];
        expect(uiMarkers).toEqual(expected);
    });
});

describe('<Game />', function () {


    it('renders a Board', function () {
        var renderedGame = ReactTestUtils.renderIntoDocument(
            <Game />
        );

        var board = ReactTestUtils.scryRenderedComponentsWithType(renderedGame, Board);
        expect(board.length).toEqual(1);
        var reset = ReactTestUtils.scryRenderedComponentsWithType(renderedGame, Reset);
        expect(reset.length).toEqual(1);
    });

    it('resets Game state when called', function () {
        var setState = function (state) {
            return state;
        };
        var initialState = Game.setInitialState();
        var updatedState = JSON.parse(JSON.stringify(initialState));
        expect(initialState).toEqual(updatedState);

        // Changed state should not equal initial state
        updatedState.board.boardContents[0] = 1;
        expect(initialState).not.toEqual(updatedState);

        var handler = Game.resetOnClick(setState);
        var resetState = handler();

        expect(resetState).toEqual(initialState);

    });
});

describe('API calls', function () {
    var mockValidator;
    var validator;
    var state;
    var setState;

    beforeEach(function (done) {
        state = Game.setInitialState();
        setState = function (state) {
            return state;
        };
        mockValidator = {
            mockApiSuccess: function () {
                console.log(arguments.callee.name + " Was Called");
                return Promise.resolve();
            },
            mockApiReject: function () {
                return Promise.reject();
            },
            mockUpdate: function () {
                console.log(arguments.callee.name + " Was Called");
            }
        };
        validator = Game.humanMoveRequest(state, setState,
            mockValidator.mockApiSuccess, mockValidator.mockUpdate);
        console.log("Finished Setup");
        spyOn(mockValidator, 'mockApiSuccess');
        spyOn(mockValidator, 'mockUpdate');
        validator(1);
        done();
    });

    it('validates move when called', function (done) {
        console.log("Starting Tests");
        console.log("Expecting Success");
        expect(mockValidator.mockApiSuccess).toHaveBeenCalled();
        console.log("Expecting Update");
        expect(mockValidator.mockUpdate).toHaveBeenCalled();
        console.log("Finished Test");
        done();
    });
});
