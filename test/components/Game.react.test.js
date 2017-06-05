var React = require('react');
var TestUtils = require('react-addons-test-utils');
var shallowTestUtils = require('react-shallow-testutils');
var Board = require('../../src/components/Board.react');
var Game = require('../../src/components/Game.react');
var Reset = require('../../src/components/Reset.react');

describe('init', function () {
    it('has keys: square, gridSize, stepNumber, xIsNext', function () {
        var expected = {
            squares: Array.apply(null, Array(9)).map(Number.prototype.valueOf,0),
            gridSize: 3,
            xIsNext: true,
        };
        var initObj = Game.init();
        expect(initObj).toEqual(expected);
    });
});

describe('<Game />', function () {
    it('renders a Board', function () {
        renderer = TestUtils.createRenderer();
        renderer.render(
            <Game />
        );

        var renderedGame = renderer.getRenderOutput();
        var board = shallowTestUtils.findAllWithType(renderedGame, Board);
        expect(board.length).toEqual(1);
        var reset = shallowTestUtils.findAllWithType(renderedGame, Reset);
        expect(reset.length).toEqual(1);
    });

    it('updates Game state when handleClick when called', function () {
        var state = Game.init();
        var setState = function (state) {
            return state;
        };

        var handler = Game.handleClick(state, setState);
        var nextState = handler(1);

        expect(state.squares[1]).toEqual(0);
        expect(state.xIsNext).toEqual(true);
        expect(nextState.squares[1]).toEqual("X");
        expect(nextState.xIsNext).toEqual(false);
    });

    it('resets Game state when called', function () {
        var setState = function (state) {
            return state;
        };

        var initialState = Game.init();
        var updatedState = JSON.parse(JSON.stringify(initialState));
        expect(initialState).toEqual(updatedState);

        // Changed state should not equal initial state
        updatedState.squares[0] = 'X';
        expect(initialState).not.toEqual(updatedState);

        var handler = Game.resetOnClick(setState);
        var resetState = handler();

        expect(resetState).toEqual(initialState);

    });
});
