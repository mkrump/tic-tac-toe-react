var React = require('react')
var ReactTestUtils = require('react-dom/test-utils')
var Reset = require('../../src/components/Reset.react')

describe('<Reset />', function () {
  it('has a button reset-button styling and a value', function () {
    var clickHandlerSpy = jasmine.createSpy()
    var reset = ReactTestUtils.renderIntoDocument(
      <Reset value={'text'} onClick={clickHandlerSpy}/>
    )
    var button = ReactTestUtils.findRenderedDOMComponentWithTag(
      reset, 'button'
    )

    ReactTestUtils.Simulate.click(button)
    expect(clickHandlerSpy).toHaveBeenCalled()
    expect(button.className).toEqual('reset-button')
    expect(button.textContent).toEqual('text')
  })
})
