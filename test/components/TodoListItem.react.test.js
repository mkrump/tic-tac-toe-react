var React     = require('react');
var TestUtils = require('react-addons-test-utils');

var TodoListItem = require('../../src/components/TodoListItem.react');

describe('<TodoListItem />', function() {
  it('extracts the text of an item', function() {
    var item = TestUtils.renderIntoDocument(
      <TodoListItem item={{ text: 'sample-text' }} />
    );

    expect(item.getItemText()).toEqual('sample-text');
  });

  it('extracts the styling class of an item', function() {
    var item = TestUtils.renderIntoDocument(
      <TodoListItem item={{ styleClass: 'sample-style' }} />
    );

    expect(item.getItemClass()).toEqual('sample-style');
  });

  it('marks items as done', function() {
    var fakeItem = { text: 'fake-text', styleClass: 'fake-style' };

    var item = TestUtils.renderIntoDocument(
      <TodoListItem item={fakeItem} />
    );

    var removeSpy = jasmine.createSpy('removeSpy');
    item.context.removeItem = removeSpy;
    item.onMarkDone({ preventDefault: function() {} });

    expect(item.context.removeItem).toHaveBeenCalledWith(fakeItem);
  });
});
