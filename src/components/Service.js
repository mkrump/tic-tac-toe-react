var axios = require('axios');

function Endpoint(url, timeout) {
    this.httpRequest = axios.create({
    baseURL : url,
    timeout : timeout,
});
}

var validateMoveEndpoint = new Endpoint('https://tic-tac-toe-clojure.herokuapp.com', 5000);

validateMoveEndpoint.validateMove = function(move, boardArray, gridSize) {
    return this.httpRequest({
        method: 'post',
        url: '/valid-move',
        data: {
            move: move,
            board: {'board-contents': boardArray, gridsize: gridSize}
        }
    });
};

validateMoveEndpoint.validateMove(1, [1, 0, 0, 0, 0, 0, 0, 0, 0], 3)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (response) {
        console.log(response);
    });

module.exports = validateMoveEndpoint;

