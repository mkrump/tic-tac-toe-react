var React = require('react');
var Board = require('./Board.react');
var Reset = require('./Reset.react');
var Service = require('./Service.js');

var PLAYERS = {"COMPUTER": -1, "HUMAN": 1};
var PLAYER_MARKERS = {};
PLAYER_MARKERS[PLAYERS["HUMAN"]] = "X";
PLAYER_MARKERS[PLAYERS["COMPUTER"]] = "O";

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
    setState({
        squares: squares,
        currentPlayer: -1 * currentPlayer,
    });
};

var squareClickHandler = function (state, setState, validate, update) {
    return function (move) {
        validate(move, state.squares, state.gridSize)
            .then(function (success) {
                console.log('Response:' + JSON.stringify(success.data));
                update(move, state, setState);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data['error-response']);
                    console.log(error.response.status);
                }
            })
    }
};

var makeComputerMove = function (state, setState, computerMove, update) {
    computerMove(state.currentPlayer, state.squares, state.gridSize, setState)
        .then(function (success) {
            console.log('Response:' + JSON.stringify(success.data));
            update(success.data.move, state, setState);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data['error-response']);
                console.log(error.response.status);
            }
        })
};

var resetOnClick = function (setState) {
    var initialState = init();
    return function () {
        return setState(initialState);
    }
};

var UIMarkers = function (board) {
    return board.map(function (square) {
        return (square === 0) ? "" : PLAYER_MARKERS[square];
    });
};

var Game = React.createClass({
    getInitialState: function () {
        return init();
    },

    componentDidUpdate: function () {
        var computerMove = Service.computerMoveEndpoint.computerMove;
        var currentPlayer = this.state.currentPlayer;
        // TODO Need to understand binding better ...
        var setState = this.setState.bind(this);
        if (currentPlayer === -1) {
            makeComputerMove(this.state, setState, computerMove, updateBoard);
        }
    },

    render: function () {
        var moveValidator = Service.validateMoveEndpoint.validateMove;
        var status = 'Next player: ' + PLAYER_MARKERS[this.state.currentPlayer];
        var humanTurn = squareClickHandler(this.state, this.setState.bind(this), moveValidator, updateBoard);
        var computerTurn = function () {};
        var clickHandler = (this.state.currentPlayer === 1) ? humanTurn : computerTurn;

        var board = <Board
            gridSize={this.state.gridSize}
            squares={UIMarkers(this.state.squares)}
            onClick={clickHandler}
        />;

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
