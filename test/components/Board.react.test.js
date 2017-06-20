var React = require('react');
var ReactTestUtils = require('react-dom/test-utils');
var Board = require('../../src/components/Board.react');
var squareContents = require('../../src/components/Board.react');
var Square = require('../../src/components/Square.react');
require('es6-promise').polyfill();


describe('squareContents converts int to text for rendering', function () {
    it('returns null if zero', function () {
        expect(Board.squareContents(0)).toBeNull();
    });

    it('returns value if non-zero', function () {
        expect(Board.squareContents(1)).toEqual("1");
    })
});

describe('<Board />', function () {
    var squaresArray;
    var handleClick;
    var gridsize;
    var shallowRenderer;
    var board;

    beforeEach(function () {
        gridsize = 3;
        squaresArray =
            [0, 0, "X",
                0, 0, 0,
                0, 0, 0];
        handleClick = function () {
        };
        board = ReactTestUtils.renderIntoDocument(
            <Board gridSize={3} squares={squaresArray} onClick={handleClick}/>
        );

    });

    it('creates Squares with a value of null when ' +
        'corresponding squaresArray entry is zero', function () {
        var square = board.renderSquare(1);
        expect(square.props.value).toBeNull();
    });

    it('creates Squares with a value equal to squaresArray index when ' +
        'corresponding squaresArray entry is non-zero', function () {
        var square = board.renderSquare(2);
        expect(square.props.value).toEqual("X");
    });

    it('renders a 3x3 Board with 3 rows and 9 squares', function () {
        var handleClick = function () {
        };
        var renderedBoard = ReactTestUtils.renderIntoDocument(
            <Board gridSize={3} squares={squaresArray} onClick={handleClick}/>
        );
        var squares = ReactTestUtils.scryRenderedComponentsWithType(renderedBoard, Square);
        var rows = ReactTestUtils.scryRenderedDOMComponentsWithClass(board, 'board-row');
        expect(squares.length).toEqual(9);
        expect(rows.length).toEqual(3);
    });

});
