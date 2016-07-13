var React     = require('react');
var TestUtils = require('react-addons-test-utils');

var ApplicationContainer = require('../../src/components/ApplicationContainer.react');

describe('<ApplicationContainer />', function() {
  it('produces the correct child context', function() {
    var app = TestUtils.renderIntoDocument(<ApplicationContainer />);
    expect(app.getChildContext()).toEqual({ removeItem: app.removeItem });
  });

  it('starts with an empty todo list', function() {
    var app = TestUtils.renderIntoDocument(<ApplicationContainer />);
    expect(app.state.items).toEqual([]);
  });

  it('adds new items', function() {
    var app = TestUtils.renderIntoDocument(<ApplicationContainer />);
    app.addItem('fake-text', true);

    expect(app.state.items).toEqual([{
      text: 'fake-text',
      styleClass: 'high-priority'
    }]);
  });

  it('removes items', function() {
    var app = TestUtils.renderIntoDocument(<ApplicationContainer />);
    app.addItem('fake-text', true);
    app.addItem('more-fake-text', false);

    app.removeItem(app.state.items[0]);

    expect(app.state.items.length).toEqual(1);
    expect(app.state.items).toEqual([{
      text: 'more-fake-text',
      styleClass: 'normal-priority'
    }]);
  });
});
