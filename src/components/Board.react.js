var React = require('react');
var Square = require('./Square.react');

var squareContents = function (contents) {
    return contents === 0 ? null : contents.toString();
};

var Board = React.createClass({

    renderSquare: function (i) {
        var contents = squareContents(this.props.squares[i]);
        return (<Square
                key={i}
                value={contents}
                onClick={this.props.onClick.bind(null, i)}
            />
        );
    },

    renderBoardRow: function (row) {
        var gridSize = this.props.gridSize;
        var squares = [];
        for (var col = 0; col < gridSize; col++) {
            squares.push(this.renderSquare(row * gridSize + col));
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
module.exports.squareContents = squareContents;
