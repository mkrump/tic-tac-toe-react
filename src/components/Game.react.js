var React = require('react');
var Board = require('./Board.react');
var Reset = require('./Reset.react');
var Service = require('./Service.js');
var GameStatus = require('./GameStatus.react');

var successCallback = function (success, setState) {
    var responseData = success.data['game-state'];
    var updatedState = {
        board: {
            boardContents: responseData.board['board-contents'],
            gridSize: responseData.board.gridsize
        },
        currentPlayer: responseData['current-player'],
        winner: responseData.winner,
        isTie: responseData['is-tie'],
    };
    return setState(updatedState);
};

var errorCallback = function (error) {
    if (error.response) {
        console.log(error.response.data['message']);
        console.log(error.response.status);
    }
};

var HttpRequestToUpdateState = function (state, setState, HttpRequest, params) {
    HttpRequest(state, params)
        .then(function (response) {
            successCallback(response, setState);
        })
        .catch(errorCallback);
};

var humanMoveRequest = function (state, setState, HttpRequest) {
    return function (move) {
        HttpRequestToUpdateState(state, setState, HttpRequest, move);
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
    return HttpRequestToUpdateState(state, setState, Service.computerMoveEndpoint.computerMove)
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

var isGameOver = function (winner, isTie) {
    return (winner !== 0) || (isTie === true);
};

var Game = React.createClass({

    getDefaultProps: function () {
        return setDefaultProps();
    },

    getInitialState: function () {
        return setInitialState();
    },

    makeComputerMove : function(state, setState){
        computerMoveHandler(state, setState);
    },

    componentDidUpdate: function () {
        if (this.state.currentPlayer === this.props.players.COMPUTER &&
            !isGameOver(this.state.winner, this.state.isTie)) {
            this.makeComputerMove(this.state, this.setState.bind(this));
        }
    },

    render: function () {
        var clickHandler = this.props.playerClickHandlers[this.state.currentPlayer](this.state, this.setState.bind(this));
        clickHandler = isGameOver(this.state.winner, this.state.isTie) ? nullClickHandler : clickHandler;
        return (
            <div className="game">
                <Board
                    gridSize={this.state.board.gridSize}
                    squares={UIMarkers(this.state.board.boardContents, this.props.playerMarkers)}
                    onClick={clickHandler}
                />
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
module.exports.humanMoveRequest = humanMoveRequest;
module.exports.nullClickHandler = nullClickHandler;
module.exports.isGameOver = isGameOver;
module.exports.humanClickHandler = humanClickHandler;
module.exports.computerMoveHandler = computerMoveHandler;
module.exports.HttpRequestToUpdateState = HttpRequestToUpdateState;
module.exports.successCallback = successCallback;
module.exports.errorCallback = errorCallback;

