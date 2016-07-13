var React = require('react');

var ItemForm = React.createClass({
  getInitialState: function() {
    return { text: '', isPriority: false };
  },

  onTextChange: function(event) {
    this.setState({ text: event.target.value });
  },

  onPriorityChange: function(event) {
    this.setState({ isPriority: event.target.checked });
  },

  onFormSubmit: function(event) {
    event.preventDefault();
    if (this.state.text === '') { return; }

    this.props.addItem(this.state.text, this.state.isPriority);
    this.setState(this.getInitialState);
  },

  render: function() {
    return (
      <div className='item-form'>
        <form ref='todoForm' onSubmit={this.onFormSubmit}>
          <div className='input-group'>
            <label for='text'>Todo Text</label>
            <input
              type='text'
              id='text'
              className='todo-input'
              ref='textInput'
              value={this.state.text}
              onChange={this.onTextChange} />
          </div>

          <div className='input-group'>
            <label for='priority'>High Priority</label>
            <input
              type='checkbox'
              id='priority'
              className='todo-priority'
              ref='priorityCheckbox'
              checked={this.state.isPriority}
              onChange={this.onPriorityChange} />
          </div>

          <input
            type='submit'
            className='todo-submit'
            value='Add Item' />
        </form>
      </div>
    );
  }
});

module.exports = ItemForm;
