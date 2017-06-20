var React = require('react');
var ReactTestUtils = require('react-dom/test-utils');
var Board = require('../../src/components/Board.react');
var Game = require('../../src/components/Game.react');
var Reset = require('../../src/components/Reset.react');

describe('setInitialState', function () {
    it('initializes an initial game state object', function () {
        var expected = {
            board: {boardContents: [0, 0, 0, 0, 0, 0, 0, 0, 0], gridSize: 3},
            currentPlayer: 1,
            winner: 0,
            isTie: false,
        };
        var initStateObj = Game.setInitialState();
        expect(initStateObj).toEqual(expected);
    });
});

describe('setDefaultProps', function () {
    it('initializes an initial props object', function () {
        var expected = {
            players: {"COMPUTER": -1, "HUMAN": 1},
            playerMarkers: {"-1": "O", "1": "X"},
            playerClickHandlers: {"-1": Game.nullClickHandler, "1": Game.humanClickHandler},
        };
        var initPropObj = Game.setDefaultProps();
        expect(initPropObj).toEqual(expected);
    });
});

describe('UIMarkers', function () {
    it('translates board squares to UI markers', function () {
        var playerMarkers = {"-1": "O", 1: "X"};
        var uiMarkers = Game.UIMarkers([0, 1, -1], playerMarkers);
        var expected = ["", "X", "O"];
        expect(uiMarkers).toEqual(expected);
    });
});

describe('gameOver', function () {
    it('returns true if is a winner', function () {
        expect(Game.isGameOver(1, false)).toEqual(true);
    });
    it('returns true if is a tie', function () {
        expect(Game.isGameOver(0, true)).toEqual(true);
    });
    it('returns false if not win or tie', function () {
        expect(Game.isGameOver(0, false)).toEqual(false);
    });
});

describe('<Game />', function () {


    it('renders a Board', function () {
        var renderedGame = ReactTestUtils.renderIntoDocument(
            <Game />
        );

        var board = ReactTestUtils.scryRenderedComponentsWithType(renderedGame, Board);
        expect(board.length).toEqual(1);
        var reset = ReactTestUtils.scryRenderedComponentsWithType(renderedGame, Reset);
        expect(reset.length).toEqual(1);
    });

    it('resets Game state when called', function () {
        var setState = function (state) {
            return state;
        };
        var initialState = Game.setInitialState();
        var updatedState = JSON.parse(JSON.stringify(initialState));
        expect(initialState).toEqual(updatedState);

        // Changed state should not equal initial state
        updatedState.board.boardContents[0] = 1;
        expect(initialState).not.toEqual(updatedState);

        var handler = Game.resetOnClick(setState);
        var resetState = handler();

        expect(resetState).toEqual(initialState);

    });
    describe('Computer Move', function () {
        var game;
        var computerPlayer;
        var humanPlayer;
        var computerPlayerMarker;

        beforeEach(function () {
            game = ReactTestUtils.renderIntoDocument(<Game />);
            spyOn(game, 'makeComputerMove');
            computerPlayer = game.props.players.COMPUTER;
            humanPlayer = game.props.players.HUMAN;
            computerPlayerMarker = game.props.playerMarkers[computerPlayer];
        });

        it('calls makeComputerMove when computer turn', function () {
            game.setState({currentPlayer: game.props.players.COMPUTER});
            expect(game.makeComputerMove).toHaveBeenCalled();
        });

        it('does not call makeComputerMove when not computer turn', function () {
            game.setState({currentPlayer: humanPlayer});
            expect(game.makeComputerMove).not.toHaveBeenCalled();
        });

        it('does not call makeComputerMove when game over even if computer turn', function () {
            game.setState({currentPlayer: computerPlayer, isTie: true});
            expect(game.makeComputerMove).not.toHaveBeenCalled();
        });

        it('does not call makeComputerMove when game over even if computer turn', function () {
            game.setState({currentPlayer: computerPlayer, winner: computerPlayerMarker});
            expect(game.makeComputerMove).not.toHaveBeenCalled();
        });
    });
});


describe('httpRequest success callback', function () {
    var setState;
    var success;

    beforeEach(function () {
        setState = function (state) {
            return state;
        };
        success = {
            "data": {
                "game-state": {
                    "board": {"board-contents": [1, 1, 0, 0, -1, 0, 0, 0, 0], "gridsize": 3},
                    "winner": 0,
                    "is-tie": false,
                    "current-player": -1
                },
                "message": "Success"
            }
        }
    });

    it('calls setState with response data', function () {
        var expected = {
            board: {
                boardContents: [1, 1, 0, 0, -1, 0, 0, 0, 0],
                gridSize: 3
            },
            currentPlayer: -1,
            winner: 0,
            isTie: false
        };
        var updatedState = Game.successCallback(success, setState);
        expect(updatedState).toEqual(expected);
    });
});

describe('httpRequest error callback', function () {
    var setState;
    var error;

    beforeEach(function () {
        setState = function (state) {
            return state;
        };
        error = {
            "response": {
                "data": {
                    "game-state": {
                        "board": {"board-contents": [1, 1, 0, 0, -1, 0, 0, 0, 0], "gridsize": 3},
                        "winner": 0,
                        "is-tie": false,
                        "current-player": -1
                    },
                    "message": "Failed"
                }
            }
        }
    });

    it('logs error message to console', function () {
        spyOn(console, 'log');
        Game.errorCallback(error);
        expect(console.log).toHaveBeenCalledWith("Failed");
    });
});


