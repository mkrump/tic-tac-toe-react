var React = require('react');
var Board = require('./Board.react');
var Reset = require('./Reset.react');
var GameStatus = require('./GameStatus.react');
var gameHelpers = require("../game-helpers.js");

var Game = React.createClass({

    getDefaultProps: function () {
        return gameHelpers.setDefaultProps();
    },

    getInitialState: function () {
        return gameHelpers.setInitialState();
    },

    makeComputerMove: function (state, setState) {
        gameHelpers.computerMoveHandler(state, setState);
    },

    componentDidUpdate: function () {
        if (this.state.currentPlayer === this.props.players.COMPUTER &&
            !gameHelpers.isGameOver(this.state.winner, this.state.isTie)) {
            this.makeComputerMove(this.state, this.setState.bind(this));
        }
    },

    render: function () {
        var clickHandler = this.props.playerClickHandlers[this.state.currentPlayer](this.state, this.setState.bind(this));
        clickHandler = gameHelpers.isGameOver(this.state.winner, this.state.isTie) ? gameHelpers.nullClickHandler : clickHandler;
        return (
            <div className="game">
                <Board
                    gridSize={this.state.board.gridSize}
                    squares={gameHelpers.UIMarkers(this.state.board.boardContents, this.props.playerMarkers)}
                    onClick={clickHandler}
                />
                <div className="game-info">
                    <GameStatus
                        currentPlayer={this.props.playerMarkers[this.state.currentPlayer]}
                        isTie={this.state.isTie}
                        winner={this.props.playerMarkers[this.state.winner]}
                    />
                    <Reset
                        value={"Reset"}
                        onClick={gameHelpers.resetOnClick(this.setState.bind(this))}
                    />
                </div>
            </div>
        );
    }
});

module.exports = Game;


