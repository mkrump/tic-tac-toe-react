var React = require('react');

var setStatusMessage = function (currentPlayer, isTie, winner) {
    var statusMessage = 'Current player: ' + currentPlayer;
    if (isTie === true) {
        statusMessage = 'Tie!';
    }
    else if (winner !== undefined) {
        statusMessage = winner + "'s Win!";
    }
    return statusMessage;
};

var GameStatus = React.createClass({
    render: function () {
        var statusMessage = setStatusMessage(this.props.currentPlayer, this.props.isTie, this.props.winner);
        return (
            <div>{statusMessage}</div>
        )

    }
});

module.exports = GameStatus;
module.exports.setStatusMessage = setStatusMessage;
