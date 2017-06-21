var React = require('react')

var Reset = React.createClass({
  render: function () {
    return (
      <button className="reset-button" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    )
  }
})

module.exports = Reset
