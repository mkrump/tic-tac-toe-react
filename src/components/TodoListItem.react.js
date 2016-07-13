var React = require('react');

var TodoListItem = React.createClass({
  contextTypes: {
    removeItem: React.PropTypes.func
  },

  getItemText: function() {
    return this.props.item.text;
  },

  getItemClass: function() {
    return this.props.item.styleClass;
  },

  onMarkDone: function(event) {
    event.preventDefault();
    this.context.removeItem(this.props.item);
  },

  render: function() {
    return (
      <div className={'todo-item ' + this.getItemClass()}>
        {this.getItemText()}
        <form onSubmit={this.onMarkDone}>
          <input ref='doneButton' type='submit' value='Done' />
        </form>
      </div>
    );
  }
});

module.exports = TodoListItem;
