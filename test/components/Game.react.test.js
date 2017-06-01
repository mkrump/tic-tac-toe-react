var React = require('react');
var TestUtils = require('react-addons-test-utils');
var shallowTestUtils = require('react-shallow-testutils');

var Board = require('../../src/components/Board.react');
var Game = require('../../src/components/Game.react');


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
        var game = TestUtils.renderIntoDocument(
            <Game />
        );

        expect(game.state.squares[1]).toEqual(0);
        expect(game.state.xIsNext).toEqual(true);
        game.handleClick(1);
        expect(game.state.squares[1]).toEqual("X");
        expect(game.state.xIsNext).toEqual(false);
    });

});
