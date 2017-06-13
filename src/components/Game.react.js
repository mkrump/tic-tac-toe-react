var React = require('react');
var Board = require('./Board.react');
var Reset = require('./Reset.react');
var Service = require('./Service.js');


// TODO TEST
var humanMoveRequest = function (state, setState, validate) {
    return function (move) {
        validate(state, move)
            .then(function (success) {
                console.log('Human Move Response:' + JSON.stringify(success.data));
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
    }
};

// TODO TEST
// TODO combine with above
var makeComputerMove = function (state, setState, computerMove) {
    computerMove(state)
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
    return makeComputerMove(state, setState, Service.computerMoveEndpoint.computerMove)
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
        var winner = this.state.winner;
        var isTie = this.state.isTie;
        var gameOverMessage = "";
        if (isTie === true)
           gameOverMessage = 'Tie!';
        else if (winner !== 0)
           gameOverMessage = this.props.playerMarkers[winner] + "'s Win!";

        var clickHandler = this.props.playerClickHandlers[this.state.currentPlayer](this.state, this.setState.bind(this));

        var board = <Board
            gridSize={this.state.board.gridSize}
            squares={UIMarkers(this.state.board.boardContents, this.props.playerMarkers)}
            onClick={clickHandler}
        />;
        console.log(this.state);

        return (
            <div className="game">
                <div className="game-board">
                    {board}
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>{gameOverMessage}</div>
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
module.exports.resetOnClick = resetOnClick;
module.exports.UIMarkers = UIMarkers;
module.exports.setDefaultProps = setDefaultProps;
module.exports.humanClickHandler = humanClickHandler;
module.exports.humanMoveRequest = humanMoveRequest;
module.exports.nullClickHandler = nullClickHandler;
module.exports.computerMoveHandler = computerMoveHandler;
