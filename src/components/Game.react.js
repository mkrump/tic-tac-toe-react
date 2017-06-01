var React = require('react');
var Board = require('./Board.react');

var Game = React.createClass({
    getInitialState: function () {
        return {
            squares: Array(9).fill(0),
            gridSize: 3,
            stepNumber: 0,
            xIsNext: true,
        };
    },

    handleClick: function (i) {
        const squares = this.state.squares.slice();

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    },

    render: function () {
        var squares = this.state.squares;
        var status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        gridSize={this.state.gridSize}
                        squares={squares}
                        onClick={this.handleClick}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                </div>
            </div>
        );
    }
});



module.exports = Game;
