var React     = require('react');
var TestUtils = require('react-addons-test-utils');

var TodoList     = require('../../src/components/TodoList.react');
var TodoListItem = require('../../src/components/TodoListItem.react');

describe('<TodoList />', function() {
  it('renders a todo item', function() {
    var fakeItems = [{ text: 'fake-text' }];
    var list = TestUtils.renderIntoDocument(
      <TodoList items={fakeItems} />
    );

    var renderedItem = TestUtils.findRenderedComponentWithType(
      list, TodoListItem
    );

    expect(renderedItem).not.toBeUndefined();
  });
});
