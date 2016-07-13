var React = require('react');

var TodoListItem = require('./TodoListItem.react');

var TodoList = React.createClass({
  renderTodoItem: function(item) {
    var index = this.props.items.indexOf(item);

    return (
      <TodoListItem key={index} item={item} />
    );
  },

  render: function() {
    return (
      <div className='todo-list'>
        {this.props.items.map(this.renderTodoItem)}
      </div>
    );
  }
});

module.exports = TodoList;
