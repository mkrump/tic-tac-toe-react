var React = require('react');
var Board = require('./Board.react');
var Reset = require('./Reset.react');
var axios = require('axios');

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
    return setState({
        squares: squares,
        currentPlayer: -1 * state.currentPlayer
    });
};

var validateMoveAPI = function (move, state) {
    var localHost = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 1000,
    });
    return localHost.post('/valid-move', {
        move: move,
        board: {'board-contents': state.squares, gridsize: state.gridSize}
    });
};

var squareClickHandler = function (state, setState, validation, action) {
    return function (move) {
        validation(move, state)
            .then(function(success){
                console.log('validateMoveAPI WAS CALLED!');
                console.log('Response:' + JSON.stringify(success.data));
                action(move, state, setState)
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
        return init()
    },

    render: function () {
        var squares = this.state.squares;
        var status = 'Next player: ' + (this.state.currentPlayer ? 'X' : 'O');

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        gridSize={this.state.gridSize}
                        squares={UIMarkers(squares)}
                        onClick={squareClickHandler(this.state, this.setState.bind(this), validateMoveAPI, updateBoard)}
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
module.exports.updateBoard = updateBoard;
module.exports.resetOnClick = resetOnClick;
module.exports.squareClickHandler = squareClickHandler;
module.exports.validateMoveAPI = validateMoveAPI;
module.exports.UIMarkers = UIMarkers;
