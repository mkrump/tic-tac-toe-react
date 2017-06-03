var React = require('react');
var TestUtils = require('react-addons-test-utils');

var Square = require('../../src/components/Square.react');

describe('<Square />', function () {
    it('has a button square styling and a value', function () {
        var clickHandlerSpy = jasmine.createSpy();
        var square = TestUtils.renderIntoDocument(

            <Square value={'text'} onClick={clickHandlerSpy}/>
        );
        var button = TestUtils.findRenderedDOMComponentWithTag(
            square, 'button'
        );

        TestUtils.Simulate.click(button);
        expect(clickHandlerSpy).toHaveBeenCalled();
        expect(button.className).toEqual('square');
        expect(button.textContent).toEqual('text');
    });
});
