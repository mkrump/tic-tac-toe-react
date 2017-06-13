var React = require('react');
var Board = require('./Board.react');
var Reset = require('./Reset.react');
var axios = require('axios');
var Service = require('./Service.js');

var init = function () {
    return {
        squares: Array.apply(null, Array(9)).map(Number.prototype.valueOf, 0),
        gridSize: 3,
        currentPlayer: 1,
    }
};


var updateBoard = function (i, state, setState) {
    var squares = state.squares.slice();
    squares[i] = (state.currentPlayer === 1) ? 1 : -1;
    currentPlayer = state.currentPlayer;
    console.log("Update Board");
    return setState({
        squares: squares,
        currentPlayer: -1 * currentPlayer,
    });
};

var squareClickHandler = function (state, setState, validation, action) {
    return function (move) {
        validation(move, state.squares, state.gridSize)
            .then(function (success) {
                console.log('Response:' + JSON.stringify(success.data));
                action(move, state, setState);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data['error-response']);
                    console.log(error.response.status);
                }
            })
    }
};

var resetOnClick = function (setState) {
    var initialState = init();
    return function () {
        return setState(initialState);
    }
};

var UIMarkers = function (board) {
    return board.map(function (square) {
        if (square === 1) return "X";
        else if (square === -1) return "O";
        else return "";
    });
};

var Game = React.createClass({
    getInitialState: function () {
        return init();
    },

    componentDidUpdate: function (prevProps, prevState) {
        var computerMove = Service.computerMoveEndpoint.computerMove;
        var currentPlayer = this.state.currentPlayer;
        var squares = this.state.squares;
        var gridSize = this.state.gridSize;
        var state = this.state;
        // TODO Need to understand binding better ...
        var setState = this.setState.bind(this);
        console.log("Here");
        console.log(prevState.currentPlayer);
        console.log(this.state.currentPlayer);
        if (currentPlayer === -1) {
            computerMove(currentPlayer, squares, gridSize, setState)
                .then(function (success) {
                    console.log('Response:' + JSON.stringify(success.data));
                    console.log(success.data.move);
                    updateBoard(success.data.move, state, setState);
                    console.log("Even Here");
                });
        }
    },

    render: function () {
        var status = 'Next player: ' + ((this.state.currentPlayer) === 1 ? 'X' : 'O');
        var board = this.board;
        var moveValidator = Service.validateMoveEndpoint.validateMove;

        if (this.state.currentPlayer === 1) {
            board = <Board
                gridSize={this.state.gridSize}
                squares={UIMarkers(this.state.squares)}
                onClick={squareClickHandler(this.state, this.setState.bind(this), moveValidator, updateBoard)}
            />;
        } else {
            board = <Board
                squares={UIMarkers(this.state.squares)}
                gridSize={this.state.gridSize}
                onClick={function () {
                }}
            />
        }
        return (
            <div className="game">
                <div className="game-board">
                    {board}
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
module.exports.updateBoard = updateBoard;
module.exports.resetOnClick = resetOnClick;
module.exports.squareClickHandler = squareClickHandler;
module.exports.UIMarkers = UIMarkers;
