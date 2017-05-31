var React = require('react');
var Board = require('./Board.react');

var Game = React.createClass({
    getInitialState: function () {
        return {
            squares: Array(9).fill(null),
            gridSize: 3,
            stepNumber: 0,
            xIsNext: true,
        };
    },

    handleClick: function (i) {
        const squares = this.state.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            stepNumber: squares.length,
            xIsNext: !this.state.xIsNext,
        });
    },

    render: function () {
        var squares = this.state.squares;
        var winner = calculateWinner(squares);

        var status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

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

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0],
            b = lines[i][1],
            c = lines[i][2];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

module.exports = Game;
