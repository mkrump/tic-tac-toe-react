var React = require('react');
var ReactTestUtils = require('react-dom/test-utils');

var Square = require('../../src/components/Square.react');

describe('<Square />', function () {
    it('has a button square styling and a value', function () {
        var clickHandlerSpy = jasmine.createSpy();
        var square = ReactTestUtils.renderIntoDocument(
            <Square value={'text'} onClick={clickHandlerSpy}/>
        );
        var button = ReactTestUtils.findRenderedDOMComponentWithTag(
            square, 'button'
        );

        ReactTestUtils.Simulate.click(button);
        expect(clickHandlerSpy).toHaveBeenCalled();
        expect(button.className).toEqual('square');
        expect(button.textContent).toEqual('text');
    });
});
