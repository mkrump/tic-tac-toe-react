var React = require('react');
var ReactTestUtils = require('react-dom/test-utils');

var GameStatus = require('../../src/components/GameStatus.react');

describe('setStatus', function () {
    it('prompts the current player when game is not over', function () {
        expect(GameStatus.setStatusMessage("X", false)).toEqual('Current player: X');
    });
    it('returns "Tie!" if game is a tie', function () {
        expect(GameStatus.setStatusMessage("X", true)).toEqual('Tie!');
    });
    it('returns message w/ winner if there is winner', function () {
        expect(GameStatus.setStatusMessage("X", false, "O")).toEqual("O's Win!");
    })

});

describe('<GameStatus />', function () {
    it('it renders GameStatus Component', function () {
        var gameStatus = ReactTestUtils.renderIntoDocument(
            <GameStatus
                currentPlayer={"X"}
                isTie={false}
                winner={"O"}
            />);
        var gameStatusDiv = ReactTestUtils.scryRenderedDOMComponentsWithTag(
            gameStatus, 'div'
        );
        expect(gameStatusDiv.length).toEqual(1);
    });
});

