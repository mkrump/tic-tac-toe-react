var React = require('react');
var TestUtils = require('react-addons-test-utils');
var shallowTestUtils = require('react-shallow-testutils');

var Board = require('../../src/components/Board.react');
var Square = require('../../src/components/Square.react');


describe('<Board />', function () {
    var squaresArray;
    var handleClick;
    var gridsize;
    var renderer;
    var board;

    beforeEach(function () {
        gridsize = 3;
        squaresArray = [0, 0, "X",
            0, 0, 0,
            0, 0, 0];
        handleClick = function () {};
        board = TestUtils.renderIntoDocument(
            <Board gridSize={3} squares={squaresArray} onClick={handleClick}/>
        );

    });

    it('Board squares equal to zero create ' +
        'Squares with a value of null', function () {
        var square = board.renderSquare(1);
        expect(square.props.value).toBeNull();
    });

    it('Board squares not equal to zero create Squares ' +
        'with a value equal to their value', function () {
        var square = board.renderSquare(2);
        expect(square.props.value).toEqual("X");
    });

    it('It renders a 3x3 Board with 9 squares', function () {
        var handleClick = function () {
        };
        renderer = TestUtils.createRenderer();
        renderer.render(
            <Board gridSize={3} squares={squaresArray} onClick={handleClick}/>
        );
        var renderedBoard = renderer.getRenderOutput();
        var squares = shallowTestUtils.findAllWithType(renderedBoard, Square);
        var rows = TestUtils.scryRenderedDOMComponentsWithClass(board, 'board-row');
        expect(squares.length).toEqual(9);
        expect(rows.length).toEqual(3);
    });

});
