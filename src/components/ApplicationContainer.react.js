var React = require('react');

var ApplicationHeader = require('./ApplicationHeader.react');
var TodoList          = require('./TodoList.react');
var ItemForm          = require('./ItemForm.react');

var ApplicationContainer = React.createClass({
  childContextTypes: {
    removeItem: React.PropTypes.func
  },

  getChildContext: function() {
    return { removeItem: this.removeItem };
  },

  getInitialState: function() {
    return { items: [] };
  },

  addItem: function(itemText, isPriority) {
    var priorityClass = isPriority ? 'high-priority' : 'normal-priority';
    var newItem = { text: itemText, styleClass: priorityClass };

    var newItems = this.state.items.concat(newItem);
    this.setState({ items: newItems });
  },

  removeItem: function(item) {
    var newItems = this.state.items.slice();
    var deleteIndex = newItems.indexOf(item);
    newItems.splice(deleteIndex, 1);

    this.setState({ items: newItems });
  },

  render: function() {
    return (
      <div className='react-sample-container'>
        <ApplicationHeader />
        <TodoList items={this.state.items} />
        <ItemForm addItem={this.addItem} />
      </div>
    );
  }
});

module.exports = ApplicationContainer;
