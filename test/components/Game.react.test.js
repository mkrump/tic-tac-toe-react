var React = require('react');
var ReactTestUtils = require('react-dom/test-utils');
var Board = require('../../src/components/Board.react');
var Game = require('../../src/components/Game.react');
var Reset = require('../../src/components/Reset.react');

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


    describe('Computer Move', function () {
        var game;
        var computerPlayer;
        var humanPlayer;
        var computerPlayerMarker;

        beforeEach(function () {
            game = ReactTestUtils.renderIntoDocument(<Game />);
            spyOn(game, 'makeComputerMove');
            computerPlayer = game.props.players.COMPUTER;
            humanPlayer = game.props.players.HUMAN;
            computerPlayerMarker = game.props.playerMarkers[computerPlayer];
        });

        it('calls makeComputerMove when computer turn', function () {
            game.setState({currentPlayer: game.props.players.COMPUTER});
            expect(game.makeComputerMove).toHaveBeenCalled();
        });

        it('does not call makeComputerMove when not computer turn', function () {
            game.setState({currentPlayer: humanPlayer});
            expect(game.makeComputerMove).not.toHaveBeenCalled();
        });

        it('does not call makeComputerMove when game over even if computer turn', function () {
            game.setState({currentPlayer: computerPlayer, isTie: true});
            expect(game.makeComputerMove).not.toHaveBeenCalled();
        });

        it('does not call makeComputerMove when game over even if computer turn', function () {
            game.setState({currentPlayer: computerPlayer, winner: computerPlayerMarker});
            expect(game.makeComputerMove).not.toHaveBeenCalled();
        });
    });
});




