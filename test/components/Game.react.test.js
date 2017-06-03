var React = require('react');
var TestUtils = require('react-addons-test-utils');
var shallowTestUtils = require('react-shallow-testutils');
var Board = require('../../src/components/Board.react');
var Game = require('../../src/components/Game.react');

describe('init', function () {
    it('has keys: square, gridSize, stepNumber, xIsNext', function () {
        var expected = {
            squares: Array(9).fill(0),
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
    });

    it('updates Game state when handleClick is called', function () {
        var state = Game.init();
        var setState = function (nextState) {
            return Object.assign({}, state, nextState);
        };

        var handler = Game.handleClick(state, setState);
        var nextState = handler(1);

        expect(state.squares[1]).toEqual(0);
        expect(state.xIsNext).toEqual(true);
        expect(nextState.squares[1]).toEqual("X");
        expect(nextState.xIsNext).toEqual(false);
    });

});
