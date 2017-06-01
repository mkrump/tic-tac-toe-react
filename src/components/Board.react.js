var React = require('react');
var Square = require('./Square.react');

var Board = React.createClass({

    squareContents: function (contents) {
        return contents === 0 ? null : contents;
    },

    renderSquare: function (i) {
        return (<Square
                key={i}
                value={this.squareContents(this.props.squares[i])}
                onClick={this.props.onClick.bind(null, i)}
            />
        );
    },

    renderBoardRow: function (row) {
        var gridsize = this.props.gridSize;
        var squares = [];
        for (var col = 0; col < gridsize; col++) {
            squares.push(this.renderSquare(row * gridsize + col));
        }
        return (
            <div className="board-row">
                {squares}
            </div>
        )
    },

    render: function () {
        var board = [];
        for (var row = 0; row < this.props.gridSize; row++) {
            board.push(this.renderBoardRow(row));
        }
        return (
            <div>
                {board}
            </div>
        );
    }
});

module.exports = Board;
