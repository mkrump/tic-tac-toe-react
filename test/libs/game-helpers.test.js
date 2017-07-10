var gameHelpers = require('../../src/game-helpers')

describe('setInitialState', function () {
  it('initializes an initial game state object', function () {
    var expected = {
      board: {boardContents: [0, 0, 0, 0, 0, 0, 0, 0, 0], gridSize: 3},
      currentPlayer: -1,
      winner: 0,
      isTie: false,
      gameOver: false
    }
    var initStateObj = gameHelpers.setInitialState()
    expect(initStateObj).toEqual(expected)
  })
})

describe('setDefaultProps', function () {
  it('initializes an initial props object', function () {
    var expected = {
      players: {'COMPUTER': 1, 'HUMAN': -1},
      playerMarkers: {'1': 'O', '-1': 'X'},
      playerClickHandlers: {'1': gameHelpers.nullClickHandler, '-1': gameHelpers.humanClickHandler}
    }
    var initPropObj = gameHelpers.setDefaultProps()
    expect(initPropObj).toEqual(expected)
  })
})

describe('resetOnClick', function () {
  it('initializes an initial props object', function () {
    var setState = function (state) {
      return state
    }
    var initialState = gameHelpers.setInitialState()
    var updatedState = JSON.parse(JSON.stringify(initialState))
    expect(initialState).toEqual(updatedState)

    // Changed state should not equal initial state
    updatedState.board.boardContents[0] = 1
    expect(initialState).not.toEqual(updatedState)

    var handler = gameHelpers.resetOnClick(setState)
    var resetState = handler()

    expect(resetState).toEqual(initialState)
  })
})

describe('UIMarkers', function () {
  it('translates board squares to UI markers', function () {
    var playerMarkers = {'-1': 'O', 1: 'X'}
    var uiMarkers = gameHelpers.UIMarkers([0, 1, -1], playerMarkers)
    var expected = ['', 'X', 'O']
    expect(uiMarkers).toEqual(expected)
  })
})

describe('httpRequest success callback', function () {
  var setState
  var success

  beforeEach(function () {
    setState = function (state) {
      return state
    }
    success = {
      'data': {
        'game-state': {
          'board': {'board-contents': [1, 1, 0, 0, -1, 0, 0, 0, 0], 'gridsize': 3},
          'winner': 0,
          'is-tie': false,
          'game-over': false,
          'current-player': -1
        },
        'message': 'Success'
      }
    }
  })

  it('calls setState with response data', function () {
    var expected = {
      board: {
        boardContents: [1, 1, 0, 0, -1, 0, 0, 0, 0],
        gridSize: 3
      },
      currentPlayer: -1,
      winner: 0,
      gameOver: false,
      isTie: false
    }
    var updatedState = gameHelpers.successCallback(success, setState)
    expect(updatedState).toEqual(expected)
  })
})

describe('httpRequest error callback', function () {
  var error

  beforeEach(function () {
    error = {
      'response': {
        'data': {
          'game-state': {
            'board': {'board-contents': [1, 1, 0, 0, -1, 0, 0, 0, 0], 'gridsize': 3},
            'winner': 0,
            'is-tie': false,
            'current-player': -1,
            'game-over': false
          },
          'message': 'Failed'
        }
      }
    }
  })

  it('logs error message to console', function () {
    spyOn(console, 'log')
    gameHelpers.errorCallback(error)
    expect(console.log).toHaveBeenCalledWith('Failed')
  })
})
