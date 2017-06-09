var React = require('react');
var ReactTestUtils = require('react-dom/test-utils');

var Board = require('../../src/components/Board.react');
var Game = require('../../src/components/Game.react');
var Reset = require('../../src/components/Reset.react');

describe('init', function () {
    it('has keys: square, gridSize, stepNumber, currentPlayer', function () {
        var expected = {
            squares: Array.apply(null, Array(9)).map(Number.prototype.valueOf, 0),
            gridSize: 3,
            currentPlayer: 1,
        };
        var initObj = Game.init();
        expect(initObj).toEqual(expected);
    });
});

describe('UIMarkers', function () {
    it('translates board squares to UI markers', function () {
        var uiMarkers = Game.UIMarkers([0, 1, -1]);
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

    it('updates Game state when updateBoard when called', function () {
        var state = Game.init();
        var setState = function (state) {
            return state;
        };

        var nextState = Game.updateBoard(1, state, setState);

        expect(state.squares[1]).toEqual(0);
        expect(state.currentPlayer).toEqual(1);
        expect(nextState.squares[1]).toEqual(1);
        expect(nextState.currentPlayer).toEqual(-1);
    });


    it('resets Game state when called', function () {
        var setState = function (state) {
            return state;
        };
        var initialState = Game.init();
        var updatedState = JSON.parse(JSON.stringify(initialState));
        expect(initialState).toEqual(updatedState);

        // Changed state should not equal initial state
        updatedState.squares[0] = 1;
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
        state = Game.init();
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
        validator = Game.squareClickHandler(state, setState,
            mockValidator.mockApiSuccess, mockValidator.mockUpdate);
        done();
    });

    it('validates move when called', function (done) {
        spyOn(mockValidator, 'mockApiSuccess');
        spyOn(mockValidator, 'mockUpdate');

        validator(1);

        expect(mockValidator.mockApiSuccess).toHaveBeenCalled();
        expect(mockValidator.mockUpdate).toHaveBeenCalled();
        done();
    });
});
