var React = require('react');
var Board = require('./Board.react');
var Reset = require('./Reset.react');

var init = function () {
    return {
        // squares: Array(9).fill(0),
        squares: Array.apply(null, Array(9)).map(Number.prototype.valueOf, 0),
        gridSize: 3,
        xIsNext: true,
    };
};

var handleClick = function (state, setState) {
    return function (i) {
        const squares = state.squares.slice();

        squares[i] = state.xIsNext ? 'X' : 'O';
        return setState({
            squares: squares,
            xIsNext: !state.xIsNext,
        });
    }
};

var resetOnClick = function (setState) {
    var initialState = init();
    return function () {
        return setState(initialState);
    }
};

var Game = React.createClass({
    getInitialState: function () {
        return init()
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
                        onClick={handleClick(this.state, this.setState.bind(this))}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div><Reset
                        value={"Reset"}
                        onClick={resetOnClick(this.setState.bind(this))}
                    />
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = Game;
module.exports.init = init;
module.exports.handleClick = handleClick;
module.exports.resetOnClick = resetOnClick;
