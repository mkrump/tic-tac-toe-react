var React = require('react');
var Square = require('./Square.react');

var Board = React.createClass({

    renderSquare: function(i) {
        return (<Square
                key={i}
                value={(this.props.squares[i]) === 0 ? null : this.props.squares[i]}
                onClick={this.props.onClick.bind(null, i)}
            />
        );
    },

    render: function(gridSize) {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
});

module.exports = Board;
