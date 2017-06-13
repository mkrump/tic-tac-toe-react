var React = require('react');
var Board = require('./Board.react');
var Reset = require('./Reset.react');
var Service = require('./Service.js');

var updateBoard = function (i, state, setState) {
    var squares = state.squares.slice();
    squares[i] = (state.currentPlayer === 1) ? 1 : -1;
    var currentPlayer = state.currentPlayer;
    return setState({
        squares: squares,
        currentPlayer: -1 * currentPlayer,
    });
};

// TODO TEST
var humanMoveRequest = function (state, setState, validate, update) {
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

// TODO TEST
// TODO combine with above
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
    var initialState = setInitialState();
    return function () {
        return setState(initialState);
    }
};

var UIMarkers = function (board, playerMarkers) {
    return board.map(function (square) {
        return (square === 0) ? "" : playerMarkers[square];
    });
};

var humanClickHandler = function (state, setState) {
    return humanMoveRequest(state, setState, Service.validateMoveEndpoint.validateMove, updateBoard)
};

var computerMoveHandler = function (state, setState) {
    return makeComputerMove(state, setState, Service.computerMoveEndpoint.computerMove, updateBoard)
};

var nullClickHandler = function (state, setState) {
    return function () {
    };
};

var setDefaultProps = function () {
    var players = {"COMPUTER": -1, "HUMAN": 1};

    var playerMarkers = {};
    playerMarkers[players["HUMAN"]] = "X";
    playerMarkers[players["COMPUTER"]] = "O";

    var playerClickHandlers = {};
    playerClickHandlers[players["HUMAN"]] = humanClickHandler;
    playerClickHandlers[players["COMPUTER"]] = nullClickHandler;

    return {
        players: players,
        playerMarkers: playerMarkers,
        playerClickHandlers: playerClickHandlers,
        makeComputerMove: computerMoveHandler,
    }
};

var setInitialState = function () {

    return {
        squares: Array.apply(null, Array(9)).map(Number.prototype.valueOf, 0),
        gridSize: 3,
        currentPlayer: 1,
    }
};

var Game = React.createClass({
    getDefaultProps: function () {
        return setDefaultProps();
    },

    getInitialState: function () {
        return setInitialState();
    },

    componentDidUpdate: function () {
        if (this.state.currentPlayer === this.props.players.COMPUTER) {
            // TODO Need to understand binding better ...
            this.props.makeComputerMove(this.state, this.setState.bind(this));
        }
    },

    render: function () {
        var status = 'Next player: ' + this.props.playerMarkers[this.state.currentPlayer];
        var clickHandler = this.props.playerClickHandlers[this.state.currentPlayer](this.state, this.setState.bind(this));

        var board = <Board
            gridSize={this.state.gridSize}
            squares={UIMarkers(this.state.squares, this.props.playerMarkers)}
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
module.exports.setInitialState = setInitialState;
module.exports.updateBoard = updateBoard;
module.exports.resetOnClick = resetOnClick;
module.exports.UIMarkers = UIMarkers;
module.exports.setDefaultProps = setDefaultProps;
module.exports.humanClickHandler = humanClickHandler;
module.exports.humanMoveRequest = humanMoveRequest;
module.exports.nullClickHandler = nullClickHandler;
module.exports.computerMoveHandler = computerMoveHandler;
