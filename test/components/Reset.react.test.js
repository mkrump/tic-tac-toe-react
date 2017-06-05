var React = require('react');
var TestUtils = require('react-addons-test-utils');

var Reset = require('../../src/components/Reset.react');

describe('<Reset />', function () {
    it('has a button reset-button styling and a value', function () {
        var clickHandlerSpy = jasmine.createSpy();
        var reset = TestUtils.renderIntoDocument(

            <Reset value={'text'} onClick={clickHandlerSpy}/>
        );
        var button = TestUtils.findRenderedDOMComponentWithTag(
            reset, 'button'
        );

        TestUtils.Simulate.click(button);
        expect(clickHandlerSpy).toHaveBeenCalled();
        expect(button.className).toEqual('reset-button');
        expect(button.textContent).toEqual('text');
    });
});
