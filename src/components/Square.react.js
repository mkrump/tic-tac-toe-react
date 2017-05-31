var React = require('react');

var Square  = React.createClass( {
    render: function() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
});

module.exports = Square;
