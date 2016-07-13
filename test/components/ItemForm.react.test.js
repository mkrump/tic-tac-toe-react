var React     = require('react');
var ReactDOM  = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var ItemForm = require('../../src/components/ItemForm.react');

describe('<ItemForm />', function() {
  it('has empty initial state', function() {
    var form = TestUtils.renderIntoDocument(<ItemForm />);
    expect(form.state).toEqual({ text: '', isPriority: false });
  });

  it('updates the text on form changes', function() {
    var form = TestUtils.renderIntoDocument(<ItemForm />);

    var textInput = ReactDOM.findDOMNode(form.refs.textInput);
    TestUtils.Simulate.change(
      textInput, { target: { value: 'new-text' } }
    );

    expect(form.state.text).toEqual('new-text');
  });

  it('updates the priority status of form changes', function() {
    var form = TestUtils.renderIntoDocument(<ItemForm />);

    var textInput = ReactDOM.findDOMNode(form.refs.priorityCheckbox);
    TestUtils.Simulate.change(
      textInput, { target: { checked: true } }
    );

    expect(form.state.isPriority).toEqual(true);
  });

  it('invokes the given callback on form submission', function() {
    var fakeAddItem = jasmine.createSpy('fakeAddItem');
    var form = TestUtils.renderIntoDocument(
      <ItemForm addItem={fakeAddItem} />
    );

    form.setState({ text: 'some-fake-text' });

    var todoForm = ReactDOM.findDOMNode(form.refs.todoForm);
    TestUtils.Simulate.submit(todoForm);

    expect(fakeAddItem).toHaveBeenCalledWith('some-fake-text', false);
  });

  it('resets state upon submission', function() {
    var fakeAddItem = jasmine.createSpy('fakeAddItem');
    var form = TestUtils.renderIntoDocument(
      <ItemForm addItem={fakeAddItem} />
    );

    form.setState({ text: 'some-fake-text', isPriority: true });

    var todoForm = ReactDOM.findDOMNode(form.refs.todoForm);
    TestUtils.Simulate.submit(todoForm);

    expect(form.state).toEqual({ text: '', isPriority: false });
  });

  it('does not submit when empty', function() {
    var fakeAddItem = jasmine.createSpy('fakeAddItem');
    var form = TestUtils.renderIntoDocument(
      <ItemForm addItem={fakeAddItem} />
    );

    var todoForm = ReactDOM.findDOMNode(form.refs.todoForm);
    TestUtils.Simulate.submit(todoForm);

    expect(fakeAddItem).not.toHaveBeenCalled();
  });
});
