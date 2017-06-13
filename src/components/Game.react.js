var React = require('react');
var Board = require('./Board.react');
var Reset = require('./Reset.react');
var Service = require('./Service.js');


// TODO TEST
var apiCallThenUpdate = function (state, setState, apiCall, params) {
    apiCall(state, params)
        .then(function (success) {
            console.log('Computer Move Response:' + JSON.stringify(success.data));
            var responseData = success.data['game-state'];
            setState({
                board: {
                    boardContents: responseData.board['board-contents'],
                    gridSize: responseData.board.gridsize
                },
                currentPlayer: responseData['current-player'],
                winner: responseData.winner,
                isTie: responseData['is-tie'],
            });
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data['error-response']);
                console.log(error.response.status);
            }
        })
};

var humanMoveRequest = function (state, setState, apiCall) {
    return function (move) {
        apiCallThenUpdate(state, setState, apiCall, move);
    };
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
    return humanMoveRequest(state, setState, Service.validateMoveEndpoint.validateMove)
};

var computerMoveHandler = function (state, setState) {
    return apiCallThenUpdate(state, setState, Service.computerMoveEndpoint.computerMove)
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
        board: {boardContents: [0, 0, 0, 0, 0, 0, 0, 0, 0], gridSize: 3},
        currentPlayer: 1,
        winner: 0,
        isTie: false,
    };
};

// TODO add test
var isGameOver = function (winner, isTie) {
    return (winner !== 0) || (isTie === true);
};

// TODO separate component + Test
var GameStatus = React.createClass({
    render: function () {
        var status = 'Next player: ' + this.props.currentPlayer;
        var winner = this.props.winner;
        var isTie = this.props.isTie;
        console.log(winner);
        if (isTie === true) {
            status = 'Tie!';
        }
        else if (winner !== undefined) {
            status = winner + "'s Win!";
        }
        return (
            <div>{status}</div>
        )

    }
});

var Game = React.createClass({
    getDefaultProps: function () {
        return setDefaultProps();
    },

    getInitialState: function () {
        return setInitialState();
    },

    componentDidUpdate: function () {
        if (this.state.currentPlayer === this.props.players.COMPUTER &&
            !isGameOver(this.state.winner, this.state.isTie)) {
            // TODO Need to understand binding better ...
            this.props.makeComputerMove(this.state, this.setState.bind(this));
        }
    },

    render: function () {
        var clickHandler = this.props.playerClickHandlers[this.state.currentPlayer](this.state, this.setState.bind(this));
        var clickHandler = isGameOver(this.state.winner, this.state.isTie) ? nullClickHandler : clickHandler;
        var board = <Board
            gridSize={this.state.board.gridSize}
            squares={UIMarkers(this.state.board.boardContents, this.props.playerMarkers)}
            onClick={clickHandler}
        />;
        return (
            <div className="game">
                <div className="game-board">
                    {board}
                </div>
                <div className="game-info">
                    <GameStatus
                        currentPlayer={this.props.playerMarkers[this.state.currentPlayer]}
                        isTie={this.state.isTie}
                        winner={this.props.playerMarkers[this.state.winner]}
                    />
                    <Reset
                        value={"Reset"}
                        onClick={resetOnClick(this.setState.bind(this))}
                    />
                </div>
            </div>
        );
    }
});


module.exports = Game;
module.exports.setInitialState = setInitialState;
module.exports.resetOnClick = resetOnClick;
module.exports.UIMarkers = UIMarkers;
module.exports.setDefaultProps = setDefaultProps;
module.exports.humanClickHandler = humanClickHandler;
module.exports.humanMoveRequest = humanMoveRequest;
module.exports.nullClickHandler = nullClickHandler;
module.exports.computerMoveHandler = computerMoveHandler;
