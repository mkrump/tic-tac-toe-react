var service = require('./service.js')

var successCallback = function (success, setState) {
  var responseData = success.data['game-state']
  var updatedState = service.translateGameStateFromAPIFormat(responseData)
  return setState(updatedState)
}

var errorCallback = function (error) {
  if (error.response) {
    console.log(error.response.data['message'])
    console.log(error.response.status)
  }
}

var HttpRequestToUpdateState = function (state, setState, HttpRequest, params) {
  HttpRequest(state, params)
    .then(function (response) {
      successCallback(response, setState)
    })
    .catch(errorCallback)
}

var humanMoveRequest = function (state, setState, HttpRequest) {
  return function (move) {
    HttpRequestToUpdateState(state, setState, HttpRequest, move)
  }
}

var resetOnClick = function (setState) {
  var initialState = setInitialState()
  return function () {
    return setState(initialState)
  }
}

var UIMarkers = function (board, playerMarkers) {
  return board.map(function (square) {
    return (square === 0) ? '' : playerMarkers[square]
  })
}

var humanClickHandler = function (state, setState) {
  return humanMoveRequest(state, setState, service.TicTacToeEndpoint.validateMove)
}

var computerMoveHandler = function (state, setState) {
  return HttpRequestToUpdateState(state, setState, service.TicTacToeEndpoint.computerMove)
}

var nullClickHandler = function (state, setState) {
  return function () {
  }
}

var setDefaultProps = function () {
  var players = {'COMPUTER': 1, 'HUMAN': -1}

  var playerMarkers = {}
  playerMarkers[players['HUMAN']] = 'X'
  playerMarkers[players['COMPUTER']] = 'O'

  var playerClickHandlers = {}
  playerClickHandlers[players['HUMAN']] = humanClickHandler
  playerClickHandlers[players['COMPUTER']] = nullClickHandler

  return {
    players: players,
    playerMarkers: playerMarkers,
    playerClickHandlers: playerClickHandlers
  }
}

var setInitialState = function () {
  return {
    board: {boardContents: [0, 0, 0, 0, 0, 0, 0, 0, 0], gridSize: 3},
    currentPlayer: -1,
    winner: 0,
    isTie: false,
    gameOver: false
  }
}

module.exports.setInitialState = setInitialState
module.exports.resetOnClick = resetOnClick
module.exports.UIMarkers = UIMarkers
module.exports.setDefaultProps = setDefaultProps
module.exports.humanMoveRequest = humanMoveRequest
module.exports.nullClickHandler = nullClickHandler
module.exports.humanClickHandler = humanClickHandler
module.exports.computerMoveHandler = computerMoveHandler
module.exports.HttpRequestToUpdateState = HttpRequestToUpdateState
module.exports.successCallback = successCallback
module.exports.errorCallback = errorCallback
