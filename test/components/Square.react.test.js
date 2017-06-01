var React = require('react');
var TestUtils = require('react-addons-test-utils');

var Square = require('../../src/components/Square.react');

describe('<Square />', function () {
    it('has a button square styling and a value', function () {
        var square = TestUtils.renderIntoDocument(
            <Square value={'text'}/>
        );
        var button = TestUtils.findRenderedDOMComponentWithTag(
            square, 'button'
        );

        expect(button.className).toEqual('square');
        expect(button.textContent).toEqual('text');
    });
});
